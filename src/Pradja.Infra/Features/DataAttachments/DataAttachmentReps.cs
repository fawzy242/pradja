using Dapper;
using Microsoft.Extensions.Logging;
using Pradja.Domain.Features.DatAttachments;
using Pradja.Infra.Features.Common;

namespace Pradja.Infra.Features.DataAttachments;

public class DataAttachmentReps 
    : GenericRepository<DataAttachmentEntity>, IDataAttachmentReps
{
    public DataAttachmentReps(
        IDbConnectionFactory connFactory,
        ILogger<GenericRepository<DataAttachmentEntity>> logger
    ) : base(connFactory, logger)
    {
    }

    public async Task<IEnumerable<DataAttachmentEntity>> GetByDataAsync(
        string dataKind,
        long dataKey)
    {
        var sql = @"
select *
from DataAttachment
where DataKind = @DataKind
    and DataKey = @DataKey
    and status = 2
order by DisplayOrder
";

        return await QueryAsync(sql, new { DataKind = dataKind, DataKey = dataKey });
    }

    public async Task<int> GetMaxOrderAsync(
        string dataKind,
        long dataKey)
    {
        var sql = @"
select isnull(max(DisplayOrder), 0)
from DataAttachment
where DataKind = @DataKind
    and DataKey = @DataKey
    and status = 2
";

        return await QuerySingleAsync<int>(sql, new { DataKind = dataKind, DataKey = dataKey });
    }

    public async Task ClearPrimaryAsync(
        string dataKind,
        long dataKey)
    {
        using var conn = _connFactory.CreateConnection();

        var sql = @"
update DataAttachment
set IsPrimary = 0
where DataKind = @DataKind
    and DataKey = @DataKey
    and Status = 2
";

        await conn.ExecuteAsync(sql, new { DataKind = dataKind, DataKey = dataKey });
    }

    public async Task UpdateDisplayOrderAsync(
        long pk,
        int order)
    {
        using var conn = _connFactory.CreateConnection();

        var sql = @"
update DataAttachment
set DisplayOrder = @Order
where DataAttachmentPk = @Pk
";

        await conn.ExecuteAsync(sql, new { Pk = pk, Order = order });
    }
}