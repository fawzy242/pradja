namespace Pradja.Domain.Common.Entities;

public static class AuditableEntityExtensions
{
    public static void ApplyInsertResult(this AuditableEntity entity, IDictionary<string, object> dict)
    {
        var pkName = entity.GetKeyName();
        
        if (pkName != null && dict.TryGetValue(pkName, out var pk))
            entity.GetType().GetProperty(pkName)?.SetValue(entity, Convert.ToInt64(pk));
        if (dict.TryGetValue("Status", out var status))
            entity.Status = Convert.ToInt32(status);
        if (dict.TryGetValue("HistoryPk", out var historyPk))
            entity.HistoryPk = Convert.ToInt32(historyPk);
        if (dict.TryGetValue("Dbts", out var dbts))
            entity.Dbts = dbts as byte[];
    }
}