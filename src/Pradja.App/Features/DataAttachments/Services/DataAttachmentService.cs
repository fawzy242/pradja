using Pradja.App.Features.Common.Service;
using Pradja.App.Features.DataAttachments.Interfaces;
using Pradja.Domain.Common;
using Pradja.Domain.Common.Queries;
using Pradja.Domain.Features.DatAttachments;
using Pradja.Infra.Features.DataAttachments;

namespace Pradja.App.Features.DataAttachments.Services;

public class DataAttachmentService : IDataAttachmentService
{
    private readonly IDataAttachmentReps _reps;

    public DataAttachmentService(IDataAttachmentReps reps)
    {
        _reps = reps;
    }

    public async Task<Result<object>> CreateAsync(AddDataAttachment cmd)
    {
        if (string.IsNullOrWhiteSpace(cmd.DataKind))
            return Result<object>.Failure("DataKind is required");

        if (cmd.DataKey <= 0)
            return Result<object>.Failure("Invalid DataKey");

        var maxOrder = await _reps.GetMaxOrderAsync(cmd.DataKind!, cmd.DataKey);

        var entity = new DataAttachmentEntity
        {
            DataKind = cmd.DataKind,
            DataKey = cmd.DataKey,
            FileName = cmd.FileName,
            FilePath = cmd.FilePath,
            FileType = cmd.FileType,
            FileExtension = cmd.FileExtension,
            FileSize = cmd.FileSize,
            ThumbnailPath = cmd.ThumbnailPath,
            DisplayOrder = maxOrder + 1,
            IsPrimary = cmd.IsPrimary,
            Status = 1
        };

        var insertResult = await _reps.InsertAsync(entity);

        if (cmd.IsPrimary)
        {
            await SetPrimaryAsync((long)((dynamic)insertResult).Pk);
        }

        return Result<object>.Success(insertResult);
    }

    public async Task<Result> DeleteAsync(long pk)
    {
        await _reps.DeleteAsync(pk);
        return Result.Success();
    }

    public async Task<Result<IEnumerable<DataAttachmentEntity>>> GetByDataAsync(
        string dataKind,
        long dataKey)
    {
        var list = await _reps.GetByDataAsync(dataKind, dataKey);
        return Result<IEnumerable<DataAttachmentEntity>>.Success(list);
    }

    public async Task<Result> SetPrimaryAsync(long pk)
    {
        var entity = await _reps.GetByIdAsync(new IdQuery { Pk = pk });

        if (entity == null)
            return Result.Failure("Attachment not found");

        await _reps.ClearPrimaryAsync(entity.DataKind!, entity.DataKey!.Value);

        entity.IsPrimary = true;

        await _reps.UpdateAsync(entity);

        return Result.Success();
    }

    public async Task<Result> ReorderAsync(
        string dataKind,
        long dataKey,
        Dictionary<long, int> newOrders)
    {
        foreach (var item in newOrders)
        {
            await _reps.UpdateDisplayOrderAsync(
                item.Key,
                item.Value
            );
        }

        return Result.Success();
    }
}