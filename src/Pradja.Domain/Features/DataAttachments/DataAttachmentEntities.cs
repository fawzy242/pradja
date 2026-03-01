using Pradja.Domain.Common.Entities;

namespace Pradja.Domain.Features.DatAttachments;

public class DataAttachmentEntity : AuditableEntity
{
    public long DataAttachmentPk { get; set; }

    public string? DataKind { get; set; }

    public long? DataKey { get; set; }

    public string? FileName { get; set; }

    public string? FilePath { get; set; }

    public string? FileType { get; set; }

    public string? FileExtension { get; set; }

    public long? FileSize { get; set; }

    public string? ThumbnailPath { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsPrimary { get; set; }

    public override string? GetKeyName()
        => nameof(DataAttachmentPk);

    public override object? GetKeyValue()
        => DataAttachmentPk;
}