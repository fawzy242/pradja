// File: PropertyController.cs
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Pradja.App.Features.Common.Service;
using Pradja.App.Features.Properties.Interfaces;
using Pradja.Domain.Common.Queries;
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
        private readonly IMapper _mapper;

        public PropertyController(
            IPropertyService propertyService
            ,IMapper mapper
        )
        {
            _propertyService = propertyService;
            _mapper = mapper;
        }


        [HttpGet]
        [ProducesResponseType(typeof(Result<IEnumerable<PropertyView>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll(
            [FromQuery] int? status
        )
        {
            var cmd = new SimpleQuery
            {
                Status = status ?? 2
            };
            var result = await _propertyService.GetAllAsync(cmd);
            return this.HandleResult(result);
        }

        [HttpGet("{pk:long}")]
        [ProducesResponseType(typeof(Result<PropertyView>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(
            [FromRoute] long? pk
        )
        {
            var cmd = new IdQuery()
            {
                Pk = pk
            };
            var result = await _propertyService.GetByIdAsync(cmd);
            return this.HandleResult(result);
        }


        [HttpGet("grid")]
        public async Task<IActionResult> GetGridData(
            [FromQuery] int? status,
            [FromQuery] int? page,
            [FromQuery] int? pageSize,
            [FromQuery] string? search
        )
        {
            var cmd = new SimpleQuery
            {
                Status = status ?? 2,
                Page = page ?? 1,
                PageSize = pageSize ?? 100,
                Search = search
            };

            var result = await _propertyService.GetGridDataAsync(cmd);
            return this.HandleResult(result);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Result<PropertyEntity>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create(
            [FromBody] PropertyAddDto property
        )
        {
            var validationResult = this.HandleModelState();
            if (validationResult != null)
                return validationResult;

           var cmd = _mapper.Map<PropertyAdd>(property);

            var result = await _propertyService.CreateAsync(cmd);
            return this.HandleResult(result);
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