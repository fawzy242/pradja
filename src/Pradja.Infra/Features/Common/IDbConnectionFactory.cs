using System.Data;

namespace Pradja.Infra.Features.Common;

public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}
