using Mapster;
using Pradja.Domain.Features.Properties;
using Pradja.Features.Properties;

namespace Pradja.Mapping;

public static class MappingConfig
{
    public static void RegisterMappings()
    {
        TypeAdapterConfig<PropertyEntity, PropertyView>.NewConfig();
        TypeAdapterConfig<PropertyAddDto, PropertyAdd>.NewConfig();
    }
}

