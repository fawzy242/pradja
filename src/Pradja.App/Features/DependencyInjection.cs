using Microsoft.Extensions.DependencyInjection;
using Pradja.App.Features.Auth.Interfaces;
using Pradja.App.Features.Auth.Service;

namespace Pradja.App.Features
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailService, EmailService>();
            return services;
        }
    }
}