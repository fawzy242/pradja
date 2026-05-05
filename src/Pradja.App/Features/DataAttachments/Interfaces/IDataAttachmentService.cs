using Pradja.App.Features.Common.Service;
using Pradja.Domain.Features.DatAttachments;

namespace Pradja.App.Features.DataAttachments.Interfaces;

public interface IDataAttachmentService
{
    Task<Result<object>> CreateAsync(AddDataAttachment cmd);

    Task<Result> DeleteAsync(long pk);

    Task<Result<IEnumerable<DataAttachmentEntity>>> GetByDataAsync(
        string dataKind,
        long dataKey
    );

    Task<Result> SetPrimaryAsync(long pk);

    Task<Result> ReorderAsync(
        string dataKind,
        long dataKey,
        Dictionary<long, int> newOrders
    );
}