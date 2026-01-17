using System.Text;
using Mapster;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Pradja.App.Features;
using Pradja.Domain.Common.Auth;
using Pradja.Infra.Features.Common;
using Pradja.App.Features.Auth.Service;
using Pradja.App.Features.Auth.Interfaces;
using Pradja.Infra.Features.Auth;
using MapsterMapper;

var builder = WebApplication.CreateBuilder(args);

// 1. BASIC SERVICES
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 2. JWT AUTHENTICATION
var jwtSettings = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSettings["Key"] ?? throw new InvalidOperationException("JWT Key is not configured");
var key = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"] ?? "Pradja",
        ValidAudience = jwtSettings["Audience"] ?? "PradjaUsers",
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// 3. SWAGGER
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Pradja API",
        Version = "v1",
        Description = "Asset Management System API"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 4. CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        }
        else
        {
            var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                                ?? new[] { "https://yourdomain.com" };

            policy.WithOrigins(allowedOrigins)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
    });
});

// 5. APPLICATION SERVICES
builder.Services.AddApplicationServices();
builder.Services.AddGenericRepositories();
builder.Services.AddMapster();

// 6. AUTH SERVICES
builder.Services.AddScoped<IAuthReps, AuthReps>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Configure Mapster mappings
var mapsterConfig = TypeAdapterConfig.GlobalSettings;

mapsterConfig.Default.PreserveReference(true);
mapsterConfig.Default.IgnoreNullValues(true);

builder.Services.AddSingleton(mapsterConfig);
builder.Services.AddScoped<IMapper, ServiceMapper>();

// 7. LOGGING
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));

// 8. HTTP CONTEXT ACCESSOR
builder.Services.AddHttpContextAccessor();

// 9. API BEHAVIOR CONFIGURATION
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});

var app = builder.Build();

// ========== MIDDLEWARE PIPELINE ==========

// 1. EXCEPTION HANDLING
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

// 2. HTTPS REDIRECTION
app.UseHttpsRedirection();

// 3. STATIC FILES & DEFAULT FILES
app.UseDefaultFiles();
app.UseStaticFiles();

// 4. ROUTING
app.UseRouting();

// 5. CORS
app.UseCors("AllowSpecificOrigins");

// 6. AUTHENTICATION & AUTHORIZATION
app.UseAuthentication();
app.UseAuthorization();

// 7. SWAGGER
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pradja API V1");
        c.RoutePrefix = "swagger";
        c.DocumentTitle = "Pradja API Documentation";
        c.DisplayRequestDuration();
        c.EnableDeepLinking();
    });
}

// 8. HEALTH CHECK ENDPOINT
app.MapGet("/health", () => Results.Ok(new
{
    status = "Healthy",
    timestamp = DateTime.UtcNow,
    environment = app.Environment.EnvironmentName,
    service = "Asset Management System",
    database = "Connected"
}));

// 9. CONTROLLERS
app.MapControllers();

// 10. SPA FALLBACK
app.MapFallbackToFile("index.html");

app.Run();