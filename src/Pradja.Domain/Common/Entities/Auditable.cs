namespace Pradja.Domain.Common.Entities;

public abstract class AuditableEntity
{
    public string? EntryBy { get; set; }
    public DateTimeOffset? EntryTime { get; set; }

    public string? UpdateBy { get; set; }
    public DateTimeOffset? UpdateTime { get; set; }

    public string? ApproveBy { get; set; }
    public DateTimeOffset? ApproveTime { get; set; }

    public string? VoidBy { get; set; }
    public DateTimeOffset? VoidTime { get; set; }

    public DateTimeOffset? LastUpdate { get; set; }

    public string? DbUser { get; set; }
    public string? DbHost { get; set; }
    public DateTimeOffset? DbLastUpdate { get; set; }

    public byte[]? Dbts { get; set; }

    public string? DbtsString
    {
        get => Dbts == null ? null : Convert.ToBase64String(Dbts);
        set => Dbts = string.IsNullOrEmpty(value)
            ? null
            : Convert.FromBase64String(value);
    }

    public int HistoryPk { get; set; }

    public int? Status { get; set; }

    public string? Notes { get; set; }

   public virtual string PrimaryKeyName
    {
        get
        {
            var pkProp = GetType()
                .GetProperties()
                .FirstOrDefault(x =>
                    x.Name.EndsWith("Pk") &&
                    x.Name != nameof(HistoryPk));

            return pkProp?.Name
                ?? throw new Exception($"Primary key not found for {GetType().Name}");
        }
    }

    public virtual object? PrimaryKeyValue
    {
        get
        {
            var prop = GetType().GetProperty(PrimaryKeyName);
            return prop?.GetValue(this);
        }
    }
}
