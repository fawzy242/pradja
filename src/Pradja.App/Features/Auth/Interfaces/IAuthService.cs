// File: IAuthService.cs
using Pradja.App.Features.Common.Service;
using Pradja.Domain.Common.Auth;

namespace Pradja.App.Features.Auth.Interfaces
{
    public interface IAuthService
    {
        Task<Result<LoginResponse>> LoginAsync(LoginRequest request);
        Task<Result> ForgotPasswordAsync(string email);
        Task<Result> ResetPasswordAsync(int userId, ResetPasswordRequest request);
        Task<Result> ResetPasswordWithTokenAsync(ResetPasswordWithTokenRequest request);
        Task<Result<UserDto>> GetUserByIdAsync(int userId);
        Task<Result> ChangePasswordAsync(int userId, ChangePasswordRequest request);
    }
}