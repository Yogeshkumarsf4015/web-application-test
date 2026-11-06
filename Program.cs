var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure static files if any
app.UseDefaultFiles();
app.UseStaticFiles();

// Health endpoint
app.MapGet("/api/health", () => Results.Ok(new
{
    status = "healthy",
    framework = ".NET 8.0",
    service = "web-application-test",
    timestamp = DateTime.UtcNow
}));

// Sample info endpoint
app.MapGet("/api/info", () => Results.Ok(new
{
    environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
    os = Environment.OSVersion.ToString(),
    architecture = System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture.ToString(),
    host = Environment.MachineName
}));

app.Run();
