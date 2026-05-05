using System.Data;
using Dapper;
using Microsoft.Extensions.Logging;
using Pradja.Domain.Common.Entities;
using InterpolatedSql.Dapper;
using Pradja.Domain.Common.Queries;

namespace Pradja.Infra.Features.Common
{
    public class GenericRepository<T> : IGenericRepository<T>
    where T : AuditableEntity
    {
        protected readonly IDbConnectionFactory _connFactory;
       protected readonly ILogger _logger;
       public GenericRepository(
            IDbConnectionFactory connFactory,
            ILogger<GenericRepository<T>> logger)
        {
            _connFactory = connFactory;
            _logger = logger;
        }

        private string GetTableName()
        {
            var typeName = typeof(T).Name;

            return typeName.Replace("Entity", "");
        }

        public virtual async Task<T?> GetByIdAsync(IdQuery query)
        {
            try
            {
                using var conn = _connFactory.CreateConnection();

                var tableName = typeof(T).Name.Replace("Entity", "");

                var temp = Activator.CreateInstance<T>();
                var pkName = temp.GetKeyName() ?? throw new InvalidOperationException("Primary key not defined");

                var sql = @$"
                    select *
                    from {tableName}
                    where {pkName} = @pk
                ";

                var parameters = new DynamicParameters();
                parameters.Add("pk", query.Pk);

                var result = await conn.QueryFirstOrDefaultAsync<T>(sql, parameters);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting {Type} by id {Id}", typeof(T).Name, query.Pk);
                throw;
            }
        }

        public async Task<object> InsertAsync(T entity)
        {
            using var conn = _connFactory.CreateConnection();

            var tableName = GetTableName();
            var pkName = entity.GetKeyName();

            var excludedColumns = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                nameof(AuditableEntity.DbtsString),
                nameof(AuditableEntity.Dbts),
                pkName ?? string.Empty,
                "DbUser",
                "DbHost",
                "DbLastUpdate"
            };

            var properties = typeof(T).GetProperties()
                .Where(p =>
                    p.CanWrite &&
                    (p.PropertyType.IsValueType || p.PropertyType == typeof(string)) &&
                    !excludedColumns.Contains(p.Name)
                );

            var columns = string.Join(", ", properties.Select(p => $"[{p.Name}]"));
            var values = string.Join(", ", properties.Select(p => $"@{p.Name}"));

            var query = $@"
                declare @inserted table
                (
                    Pk bigint,
                    Status int,
                    HistoryPk int,
                    Dbts varbinary(8)
                );

                insert into [{tableName}] ({columns})
                output
                    inserted.[{pkName}],
                    inserted.[Status],
                    inserted.[HistoryPk],
                    inserted.[Dbts]
                into @inserted
                values ({values});

                select * from @inserted;
            ";

            var result = await conn.QuerySingleAsync(query, entity);

            var dict = new System.Dynamic.ExpandoObject() as IDictionary<string, object>;
            dict[pkName ?? "Pk"] = result.Pk;
            dict["Status"] = result.Status;
            dict["HistoryPk"] = result.HistoryPk;
            dict["Dbts"] = result.Dbts;

            return dict;
        }

        public async Task<int> UpdateAsync(T entity)
        {
            using var conn = _connFactory.CreateConnection();

            var tableName = GetTableName();
            var pkName = entity.GetKeyName();

            var properties = typeof(T).GetProperties()
                .Where(p =>
                    (!p.PropertyType.IsClass || p.PropertyType == typeof(string)) &&
                    p.PropertyType != typeof(byte[]) &&
                    p.Name != nameof(AuditableEntity.DbtsString))
                .Where(p => !p.Name.Equals(pkName, StringComparison.OrdinalIgnoreCase));

            var setClause = string.Join(", ", properties.Select(p => $"{p.Name} = @{p.Name}"));

            var query = $@"
                UPDATE {tableName}
                SET {setClause}
                WHERE {pkName} = @{pkName};
            ";

            return await conn.ExecuteAsync(query, entity);
        }

        public async Task<int> DeleteAsync(object id)
        {
            using var conn = _connFactory.CreateConnection();

            var tableName = GetTableName();

            var instance = (AuditableEntity)Activator.CreateInstance(typeof(T))!;
            var pkName = instance.GetKeyName();

            var query = $@"
                UPDATE {tableName}
                SET Status = @Status,
                    VoidTime = SYSDATETIMEOFFSET(),
                    LastUpdate = SYSDATETIMEOFFSET()
                WHERE {pkName} = @Id;
            ";

            return await conn.ExecuteAsync(query, new
            {
                Id = id,
                Status = 3
            });
        }

        public async Task<IEnumerable<T>> QueryAsync(string sql, object? parameters = null)
        {
            using var conn = _connFactory.CreateConnection();

            try
            {
                return await conn.QueryAsync<T>(sql, parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing query: {Sql}", sql);
                throw;
            }
        }

        public async Task<TResult> QuerySingleAsync<TResult>(string sql, object? parameters = null)
        {
            using var conn = _connFactory.CreateConnection();
            return await conn.QuerySingleAsync<TResult>(sql, parameters);
        }
    }
}