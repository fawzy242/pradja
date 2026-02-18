namespace Pradja.Domain.Common.Queries;

public class SimpleQuery : IdQuery
{
    public int? Page { get; set; }
    public int? PageSize { get; set; }
    public string? Search { get; set; }
    public DateOnly? Date { get; set; }
    public DateOnly? DateFrom { get; set; }
    public DateOnly? DateTo { get; set; }
}