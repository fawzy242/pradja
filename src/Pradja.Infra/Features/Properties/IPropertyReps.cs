using Pradja.Domain.Common.Queries;
using Pradja.Domain.Features.Properties;
using Pradja.Infra.Features.Common;

namespace Pradja.Infra.Features.Properties;

public interface IPropertyReps : IGenericRepository<PropertyEntity>
{
    Task<IEnumerable<PropertyView>> GetAllAsync(SimpleQuery query);
}