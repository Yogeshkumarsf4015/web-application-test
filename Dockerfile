# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY WebApplicationTest.csproj ./
RUN dotnet restore WebApplicationTest.csproj

# Copy full source and publish
COPY . ./
RUN dotnet publish WebApplicationTest.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Non-root user for security (provided by official .NET 8 images)
USER $APP_UID

COPY --from=build /app/publish .

# Expose HTTP port (ASP.NET Core 8 defaults to port 8080)
EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "WebApplicationTest.dll"]
