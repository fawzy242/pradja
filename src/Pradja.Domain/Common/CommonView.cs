namespace Pradja.Domain.Common;

public enum Status
{
    Draft = 0,
    Pending = 1,
    Approve = 2,
    Void = 3,
    Waiting = 4
}

public class CommonView
{
    public byte[] Dbts { get; set; } = default!;
    public int HistoryPk { get; set; }
    public int Status { get; set; }
    public string? StatusText => ((Status)Status).ToString();
    public string? Notes { get; set; }
    public string? EntryBy { get; set; }
    public DateTimeOffset? EntryTime { get; set; }
    public string? UpdateBy { get; set; }
    public DateTimeOffset? UpdateTime { get; set; }
    public string? ApproveBy { get; set; }
    public DateTimeOffset? ApproveTime { get; set; }
    public string? VoidBy { get; set; }
    public DateTimeOffset? VoidTime { get; set; }
    public DateTimeOffset? LastUpdate { get; set; }
}