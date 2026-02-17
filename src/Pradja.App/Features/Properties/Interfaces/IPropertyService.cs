// File: IPropertyService.cs

using Pradja.App.Features.Common.Service;
using Pradja.Domain.Common;
using Pradja.Domain.Common.Queries;
using Pradja.Domain.Features.Properties;

namespace Pradja.App.Features.Properties.Interfaces
{
    public interface IPropertyService
    {
        Task<Result<PropertyView>> GetByIdAsync(IdQuery query);
        Task<Result<IEnumerable<PropertyView>>> GetAllAsync(SimpleQuery query);
        Task<Result<PropertyEntity>> CreateAsync(PropertyAdd property);
        Task<Result<PropertyEntity>> UpdateAsync(int id, PropertyUpdate property);
        Task<Result> DeleteAsync(int id);
        Task<PaginatedResult<PropertyView>> GetGridDataAsync(SimpleQuery query);
    }
}