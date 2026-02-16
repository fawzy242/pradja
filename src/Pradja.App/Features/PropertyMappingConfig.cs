using Mapster;
using Pradja.Domain.Features.Properties;

namespace Pradja.App.Features;

public static class MappingConfig
{
    public static void RegisterMappings()
    {
        TypeAdapterConfig<PropertyEntity, PropertyView>.NewConfig();
    }
}

