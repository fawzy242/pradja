using Mapster;
using Pradja.Domain.Features.Properties;

namespace Pradja.App.Features.Mapping
{
    public static class PropertyMappingConfig
    {
        public static void RegisterMappings()
        {
            TypeAdapterConfig<PropertyEntity, PropertyView>.NewConfig();
        }
    }
}
