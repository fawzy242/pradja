using Pradja.Domain.Features.DatAttachments;
using Pradja.Infra.Features.Common;

namespace Pradja.Infra.Features.DataAttachments;

public interface IDataAttachmentReps 
    : IGenericRepository<DataAttachmentEntity>
{
    Task<IEnumerable<DataAttachmentEntity>> GetByDataAsync(
        string dataKind,
        long dataKey
    );

    Task<int> GetMaxOrderAsync(
        string dataKind,
        long dataKey
    );

    Task ClearPrimaryAsync(
        string dataKind,
        long dataKey
    );

    Task UpdateDisplayOrderAsync(
        long pk,
        int order
    );
}