using Microsoft.Extensions.DependencyInjection;
using Pradja.Infra.Features.Auth;
using Pradja.Infra.Features.Properties;

namespace Pradja.Infra.Features.Common
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddGenericRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IDbConnectionFactory, SqlConnectionFactory>();
            services.AddScoped<IAuthReps, AuthReps>();
            services.AddScoped<IPropertyReps, PropertyReps>();

            return services;
        }
    }
}
