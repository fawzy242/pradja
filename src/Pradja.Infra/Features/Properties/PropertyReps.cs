using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Pradja.Domain.Features.Properties;
using Pradja.Infra.Features.Common;

namespace Pradja.Infra.Features.Properties;

public class PropertyReps : GenericRepository<PropertyEntity>, IPropertyReps
{
    public PropertyReps(IConfiguration configuration, ILogger<GenericRepository<PropertyEntity>> logger) : base(configuration, logger)
    {
    }

}
