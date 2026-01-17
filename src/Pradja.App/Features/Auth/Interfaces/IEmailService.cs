// File: IEmailService.cs
namespace Pradja.App.Features.Auth.Interfaces
{
    public interface IEmailService
    {
        Task SendPasswordResetEmailAsync(string toEmail, string resetToken, string userName);
        Task SendWelcomeEmailAsync(string toEmail, string userName);
    }
}