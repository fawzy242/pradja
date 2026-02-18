using Microsoft.Extensions.Logging;
using Pradja.Domain.Features.Properties;
using Pradja.Infra.Features.Common;
using InterpolatedSql.Dapper;
using Pradja.Domain.Common.Queries;

namespace Pradja.Infra.Features.Properties;

public class PropertyReps : GenericRepository<PropertyEntity>, IPropertyReps
{
    public PropertyReps(IDbConnectionFactory connFactory, ILogger<GenericRepository<PropertyEntity>> logger) : base(connFactory, logger)
    {
    }

    public async Task<IEnumerable<PropertyView>> GetAllAsync(SimpleQuery query)
    {
        using var conn = _connFactory.CreateConnection();
        var q = conn.QueryBuilder($@"
select *
from Property A
where 1 = 1
    /**filters**/
"
        );

        if (query.Status.HasValue)
        {
            q.Where($"A.Status={query.Status}");
        }
        
        return await q.QueryAsync<PropertyView>();
    }
}
