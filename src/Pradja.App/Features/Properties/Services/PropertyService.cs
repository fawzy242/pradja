using Dapper;
using Mapster;
using MapsterMapper;
using Pradja.App.Features.Common.Service;
using Pradja.App.Features.DataAttachments.Interfaces;
using Pradja.App.Features.Properties.Interfaces;
using Pradja.Domain.Common.Entities;
using Pradja.Domain.Common.Queries;
using Pradja.Domain.Features.DatAttachments;
using Pradja.Domain.Features.Properties;
using Pradja.Infra.Features.Properties;

namespace Pradja.App.Features.Properties.Services;

public class PropertyService : IPropertyService
{
        private readonly IPropertyReps _propertyReps;
        private readonly IMapper _mapper;
        private readonly IDataAttachmentService _attachmentService;

        public PropertyService(IPropertyReps propertyReps, IMapper mapper, IDataAttachmentService attachmentService)
        {
            _propertyReps = propertyReps;
            _mapper = mapper;
            _attachmentService = attachmentService;
        }

    public async Task<Result<PropertyEntity>> CreateAsync(PropertyAdd property)
    {
        try
        {
            var entity = property.Adapt<PropertyEntity>();

            entity.Status = 1;
            entity.HistoryPk = 1;
            entity.EntryTime = DateTimeOffset.Now;
            entity.LastUpdate = DateTimeOffset.Now;

            var result = await _propertyReps.InsertAsync(entity);
            if (result is IDictionary<string, object> dict)
                entity.ApplyInsertResult(dict);

            return Result<PropertyEntity>.Success(entity, "Property created successfully");
        }
        catch (Exception ex)
        {
            return Result<PropertyEntity>.Failure($"Failed to create property: {ex.Message}");
        }
    }


    public Task<Result> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<IEnumerable<PropertyView>>> GetAllAsync(SimpleQuery query)
    {
        try
        {
            var data = await _propertyReps.GetAllAsync(query);

            if (data == null || !data.Any())
                return Result<IEnumerable<PropertyView>>.Failure("No data found");

            return Result<IEnumerable<PropertyView>>.Success(data);
        }
        catch (Exception ex)
        {
            return Result<IEnumerable<PropertyView>>.Failure(ex.Message);
        }
    }

    public async Task<Result<PropertyView>> GetByIdAsync(IdQuery query)
    {
        try
        {
            var entity = await _propertyReps.GetByIdAsync(query);

            if (entity == null)
                return Result<PropertyView>.Failure("No data found");

            var view = _mapper.Map<PropertyView>(entity);
            return Result<PropertyView>.Success(view);
        }
        catch (Exception ex)
        {
            return Result<PropertyView>.Failure(ex.Message);
        }
    }

    public async Task<PaginatedResult<PropertyView>> GetGridDataAsync(SimpleQuery query)
    {
        int page = query.Page.GetValueOrDefault(1);
        int pageSize = query.PageSize.GetValueOrDefault(10);
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;
        int offset = (page - 1) * pageSize;

        var parameters = new DynamicParameters();
        string whereClause = "WHERE Status <> 3";

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            whereClause += " AND Name LIKE @Search";
            parameters.Add("Search", $"%{query.Search}%");
        }

        // Hitung total
        string countSql = $"SELECT COUNT(*) FROM Property {whereClause}";
        int totalCount = await _propertyReps.QuerySingleAsync<int>(countSql, parameters);

        // Ambil data dengan paging
        string dataSql = $@"
            SELECT *
            FROM Property
            {whereClause}
            ORDER BY PropertyPk
            OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

        parameters.Add("Offset", offset);
        parameters.Add("PageSize", pageSize);

        var entities = await _propertyReps.QueryAsync(dataSql, parameters);

        // Map ke view
        var items = entities.Select(x => _mapper.Map<PropertyView>(x)).ToList();

        return PaginatedResult<PropertyView>.Success(
            data: items,
            totalCount: totalCount,
            page: page,
            pageSize: pageSize,
            message: "Data retrieved successfully"
        );
    }


    public Task<Result<PropertyEntity>> UpdateAsync(int id, PropertyUpdate property)
    {
        throw new NotImplementedException();
    }

    public async Task<Result> AddAttachmentAsync(AddDataAttachment cmd)
    {
        try
        {
            var property = await _propertyReps.GetByIdAsync(
                new IdQuery { Pk = cmd.DataKey }
            );

            if (property == null)
                return Result.Failure("Property not found");

            var attachmentCommand = new AddDataAttachment
            {
                DataKind = cmd.DataKind,
                DataKey = cmd.DataKey,
                FileName = cmd.FileName,
                FilePath = cmd.FilePath,
                FileType = cmd.FileType,
                FileExtension = cmd.FileExtension,
                FileSize = cmd.FileSize,
                ThumbnailPath = cmd.ThumbnailPath,
                IsPrimary = cmd.IsPrimary
            };

            var result = await _attachmentService.CreateAsync(attachmentCommand);

            if (!result.IsSuccess)
                return Result.Failure(result.Message ?? "");

            return Result.Success("Attachment added successfully");
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to add attachment: {ex.Message}");
        }
    }

    public async Task<Result> ReorderAttachmentsAsync(ReorderDataAttachment cmd)
    {
        try
        {
            if (cmd.AttachmentOrders == null || cmd.AttachmentOrders.Count == 0)
                return Result.Failure("No attachments to reorder");

            var property = await _propertyReps.GetByIdAsync(
                new IdQuery { Pk = cmd.DataKey }
            );

            if (property == null)
                return Result.Failure("Property not found");

            var result = await _attachmentService.ReorderAsync(cmd.DataKind!, cmd.DataKey, cmd.AttachmentOrders);

            if (!result.IsSuccess)
                return Result.Failure(result.Message ?? "");

            return Result.Success("Attachments reordered successfully");
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to reorder attachments: {ex.Message}");
        }
    }
}