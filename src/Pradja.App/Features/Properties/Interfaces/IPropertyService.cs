// File: IPropertyService.cs

using Pradja.App.Features.Common.Service;
using Pradja.Domain.Common;
using Pradja.Domain.Features.Properties;

namespace Pradja.App.Features.Properties.Interfaces
{
    public interface IPropertyService
    {
        Task<Result<PropertyView>> GetByIdAsync(int id);
        Task<Result<IEnumerable<PropertyView>>> GetAllAsync();
        Task<Result<PropertyEntity>> CreateAsync(PropertyAdd property);
        Task<Result<PropertyEntity>> UpdateAsync(int id, PropertyUpdate property);
        Task<Result> DeleteAsync(int id);
        Task<PaginatedResult<PropertyView>> GetGridDataAsync(SimpleQuery query);
    }
}