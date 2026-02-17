using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Pradja.Domain.Common.Entities;

namespace Pradja.Infra.Features.Common
{
    public class GenericRepository<T> : IGenericRepository<T>
    where T : AuditableEntity
    {
        private readonly string _connectionString;
        private readonly ILogger<GenericRepository<T>> _logger;

        public GenericRepository(IConfiguration configuration, ILogger<GenericRepository<T>> logger)
        {
            _connectionString = configuration.GetConnectionString("PradjaDb") 
                                 ?? throw new InvalidOperationException("Connection string 'PradjaDb' not found.");
            _logger = logger;
        }

        private string GetTableName()
        {
            var typeName = typeof(T).Name;
            return typeName.EndsWith("Entity", StringComparison.OrdinalIgnoreCase)
                ? typeName[..^6]
                : typeName;
        }

        private string GetPrimaryKeyName()
        {
            var tableName = GetTableName();
            var pkName = $"{tableName}Id";

            // Check if property exists
            var pkProperty = typeof(T).GetProperty(pkName) ??
                           typeof(T).GetProperty("Id") ??
                           typeof(T).GetProperty("ID");

            return pkProperty?.Name ?? throw new InvalidOperationException("Primary key not found");
        }

        public async Task<T?> GetByIdAsync(object id)
        {
            using var connection = new SqlConnection(_connectionString);

            var tableName = GetTableName();
            var pkName = GetPrimaryKeyName();

            var query = $"SELECT * FROM {tableName} WHERE {pkName} = @id";

            try
            {
                return await connection.QueryFirstOrDefaultAsync<T>(query, new { id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting {Type} by id {Id}", typeof(T).Name, id);
                throw;
            }
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            using var connection = new SqlConnection(_connectionString);

            var tableName = GetTableName();
            var query = $"SELECT * FROM {tableName}";

            try
            {
                return await connection.QueryAsync<T>(query);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all {Type}", typeof(T).Name);
                throw;
            }
        }

        public async Task<object> InsertAsync(T entity)
        {
            using var connection = new SqlConnection(_connectionString);

            var tableName = GetTableName();
            var pkName = entity.PrimaryKeyName;

          var excludedColumns = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                nameof(AuditableEntity.PrimaryKeyName),
                nameof(AuditableEntity.PrimaryKeyValue),
                nameof(AuditableEntity.DbtsString),
                nameof(AuditableEntity.Dbts),
                pkName,
                "DbUser",
                "DbHost",
                "DbLastUpdate"
            };

            var properties = typeof(T).GetProperties()
                .Where(p =>
                    p.CanWrite &&
                    (
                        p.PropertyType.IsValueType ||
                        p.PropertyType == typeof(string)
                    ) &&
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

            var result = await connection.QuerySingleAsync(query, entity);

            return new
            {
                result.Pk,
                result.Status,
                result.HistoryPk,
                result.Dbts
            };
        }

        public async Task<int> UpdateAsync(T entity)
        {
            using var connection = new SqlConnection(_connectionString);

            var tableName = GetTableName();
            var pkName = entity.PrimaryKeyName;

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

            return await connection.ExecuteAsync(query, entity);
        }

        public async Task<int> DeleteAsync(object id)
        {
            using var connection = new SqlConnection(_connectionString);

            var tableName = GetTableName();

            // Ambil PK name via instance kecil
            var instance = (AuditableEntity)Activator.CreateInstance(typeof(T))!;
            var pkName = instance.PrimaryKeyName;

            var query = $@"
                UPDATE {tableName}
                SET Status = @Status,
                    VoidTime = SYSDATETIMEOFFSET(),
                    LastUpdate = SYSDATETIMEOFFSET()
                WHERE {pkName} = @Id;
            ";

            return await connection.ExecuteAsync(query, new
            {
                Id = id,
                Status = 3
            });
        }

        public async Task<IEnumerable<T>> QueryAsync(string sql, object? parameters = null)
        {
            using var connection = new SqlConnection(_connectionString);

            try
            {
                return await connection.QueryAsync<T>(sql, parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing query: {Sql}", sql);
                throw;
            }
        }

        public async Task<TResult> QuerySingleAsync<TResult>(string sql, object? parameters = null)
        {
            using var connection = new SqlConnection(_connectionString);
            return await connection.QuerySingleAsync<TResult>(sql, parameters);
        }
    }
}