namespace Pradja.Domain.Common.Entities
{
    public class AuditableEntity
    {
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}