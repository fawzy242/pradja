// File: PropertyController.cs
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Pradja.App.Features.Common.Service;
using Pradja.App.Features.Properties.Interfaces;
using Pradja.Domain.Common;
using Pradja.Domain.Common.Queries;
using Pradja.Domain.Features.DatAttachments;
using Pradja.Domain.Features.Properties;
using Pradja.Features.Common;
using Pradja.Features.DataAttachments;

namespace Pradja.Features.Properties
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(
            IPropertyService propertyService
        )
        {
            _propertyService = propertyService;
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

           var cmd = property.Adapt<PropertyAdd>();

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

        [HttpPost("{pk:long}/attachment")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status404NotFound)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddAttachment(
            [FromRoute] long pk,
            [FromForm] AddDataAttachmentDto dto,
            IFormFile file
        )
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is required");

            var validationResult = this.HandleModelState();
            if (validationResult != null)
                return validationResult;

            // save file
            var folder = Path.Combine("wwwroot", "uploads", "properties", pk.ToString());

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var fullPath = Path.Combine(folder, fileName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            dto.FileName = file.FileName;
            dto.FileExtension = Path.GetExtension(file.FileName);
            dto.FileSize = file.Length;
            dto.FilePath = $"/uploads/properties/{pk}/{fileName}";
            dto.FileType = "image";

            var cmd = dto.Adapt<AddDataAttachment>();
            cmd.DataKind = DataKinds.Property;
            cmd.DataKey = pk;

            var result = await _propertyService.AddAttachmentAsync(cmd);

            return this.HandleResult(result);
        }

        [HttpPut("{pk:long}/attachment-order")]
        [ProducesResponseType(typeof(Result), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(Result), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ReorderAttachments(
            [FromRoute] long pk,
            [FromBody] ReorderDataAttachmentDto dto
        )
        {
            var validationResult = this.HandleModelState();
            if (validationResult != null)
                return validationResult;

            var cmd = dto.Adapt<ReorderDataAttachment>();
            cmd.DataKind = DataKinds.Property;
            cmd.DataKey = pk;

            var result = await _propertyService.ReorderAttachmentsAsync(cmd);
            return this.HandleResult(result);
        }
    }
}