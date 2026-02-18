using Pradja.Domain.Common.Entities;

namespace Pradja.Domain.Features.Properties;

public class PropertyEntity : AuditableEntity
{
    public long PropertyPk { get; set; }

    public string? Name { get; set; }

    public int? PropertyType { get; set; }
    public int? PropertyStatus { get; set; }
    public int? ListingType { get; set; }

    public bool? IsPrimary { get; set; }

    public decimal? LandArea { get; set; }
    public decimal? BuildingArea { get; set; }

    public int? NumOfFloors { get; set; }
    public int? NumOfBedroom { get; set; }
    public int? NumOfBathroom { get; set; }
    public int? NumOfAdditionalRoom { get; set; }
    public int? NumOfAdditionalBathroom { get; set; }

    public int? GarageSpace { get; set; }

    public int? ProvinceID { get; set; }
    public int? CityID { get; set; }
    public int? District { get; set; }
    public int? SubDistrict { get; set; }

    public int? PostalCode { get; set; }

    public string? Address { get; set; }

    public override string? GetKeyName() => nameof(PropertyPk);
    public override object? GetKeyValue() => PropertyPk;
}
