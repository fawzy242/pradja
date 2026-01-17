using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Pradja.Infra.Features.Common;

namespace Pradja.Infra.Features.Common
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddGenericRepositories(this IServiceCollection services)
        {
            // Register the generic repository implementation
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            return services;
        }
    }
}