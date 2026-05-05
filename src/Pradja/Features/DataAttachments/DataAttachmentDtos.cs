namespace Pradja.Features.DataAttachments;

public class AddDataAttachmentDto
{
    public string? FileName { get; set; }
    public string? FilePath { get; set; }
    public string? FileType { get; set; }
    public string? FileExtension { get; set; }
    public long? FileSize { get; set; }
    public string? ThumbnailPath { get; set; }
    public bool IsPrimary { get; set; }
}

public class ReorderDataAttachmentDto
{
    public Dictionary<long, int> AttachmentOrders { get; set; } = [];
}