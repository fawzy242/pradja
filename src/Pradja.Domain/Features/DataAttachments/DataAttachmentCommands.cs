using Pradja.Domain.Common.Commands;

namespace Pradja.Domain.Features.DatAttachments;

public class AddDataAttachment : BaseCommand
{
    public string? DataKind { get; set; }
    public long DataKey { get; set; }

    public string? FileName { get; set; }
    public string? FilePath { get; set; }
    public string? FileType { get; set; }
    public string? FileExtension { get; set; }
    public long? FileSize { get; set; }
    public string? ThumbnailPath { get; set; }

    public bool IsPrimary { get; set; }
}