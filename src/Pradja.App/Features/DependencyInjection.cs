using Microsoft.Extensions.DependencyInjection;
using Pradja.App.Features.Auth.Interfaces;
using Pradja.App.Features.Auth.Service;
using Pradja.App.Features.DataAttachments.Interfaces;
using Pradja.App.Features.DataAttachments.Services;
using Pradja.App.Features.Properties.Interfaces;
using Pradja.App.Features.Properties.Services;

namespace Pradja.App.Features
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IPropertyService, PropertyService>();
            services.AddScoped<IDataAttachmentService, DataAttachmentService>();

            return services;
        }
    }
}
