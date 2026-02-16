using Dapper;
using MapsterMapper;
using Pradja.App.Features.Common.Service;
using Pradja.App.Features.Properties.Interfaces;
using Pradja.Domain.Common;
using Pradja.Domain.Features.Properties;
using Pradja.Infra.Features.Common;
using Pradja.Infra.Features.Properties;

namespace Pradja.App.Features.Properties.Services;

public class PropertyService : IPropertyService
{
        private readonly IPropertyReps _propertyReps;
        private readonly IMapper _mapper;

        public PropertyService(IPropertyReps propertyReps, IMapper mapper)
        {
            _propertyReps = propertyReps;
            _mapper = mapper;
        }

   public async Task<Result<PropertyEntity>> CreateAsync(PropertyAdd property)
    {
        try
        {
            var entity = _mapper.Map<PropertyEntity>(property);

            entity.Status = 1;
            entity.HistoryPk = 1;

            await _propertyReps.InsertAsync(entity);

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

    public Task<Result<IEnumerable<PropertyView>>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Result<PropertyView>> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
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
}