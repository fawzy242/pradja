// File: PropertyController.cs
using Microsoft.AspNetCore.Mvc;
using Pradja.App.Features.Common.Service;
using Pradja.App.Features.Properties.Interfaces;
using Pradja.Domain.Common;
using Pradja.Domain.Features.Properties;
using Pradja.Features.Common;

namespace Pradja.Features.Properties
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(Result<IEnumerable<PropertyView>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _propertyService.GetAllAsync();
            return this.HandleResult(result);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Result<PropertyView>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _propertyService.GetByIdAsync(id);
            return this.HandleResult(result);
        }


        [HttpGet("grid")]
        public async Task<IActionResult> GetGridData([FromQuery] SimpleQuery query)
        {
            query.Page ??= 1;
            query.PageSize ??= 10;
            
            if (query.Page < 1) query.Page = 1;
            if (query.PageSize < 1 || query.PageSize > 100) query.PageSize = 10;

            var result = await _propertyService.GetGridDataAsync(query);
            return this.HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Result<PropertyEntity>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] PropertyAddDto property)
        {
            var validationResult = this.HandleModelState();
            if (validationResult != null)
                return validationResult;

            var cmd = new PropertyAdd
            {
                Name = property.Name,
                PropertyType = property.PropertyType,
                PropertyStatus = property.PropertyStatus,
                ListingType = property.ListingType,
                IsPrimary = property.IsPrimary,
                LandArea = property.LandArea,
                BuildingArea = property.BuildingArea,
                NumOfFloors = property.NumOfFloors,
                NumOfBedroom = property.NumOfBedroom,
                NumOfBathroom = property.NumOfBathroom,
                NumOfAdditionalRoom = property.NumOfAdditionalRoom,
                NumOfAdditionalBathroom = property.NumOfAdditionalBathroom,
                GarageSpace = property.GarageSpace,
                ProvinceID = property.ProvinceID,
                CityID = property.CityID,
                District = property.District,
                SubDistrict = property.SubDistrict,
                PostalCode = property.PostalCode,
                Address = property.Address,
                Notes = property.Notes
            };

            var result = await _propertyService.CreateAsync(cmd);
            return this.HandleResult(result, nameof(GetById));
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(Result<PropertyEntity>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, [FromBody] PropertyUpdate property)
        {
            var validationResult = this.HandleModelState();
            if (validationResult != null)
                return validationResult;

            var result = await _propertyService.UpdateAsync(id, property);
            return this.HandleResult(result);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _propertyService.DeleteAsync(id);
            return this.HandleResult(result);
        }
    }
}