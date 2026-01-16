using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

public class DbConnection : IDbConnection
{
    private readonly IConfiguration _config;

    public DbConnection(IConfiguration config)
    {
        _config = config;
    }

    public System.Data.IDbConnection Create()
        => new SqlConnection(_config.GetConnectionString("Default"));
}
