# Cloudflare & Docker CI/CD Test Application

This repository demonstrates two deployment models:
1. **Cloudflare Workers (Edge Serverless / Node.js & Static Assets)** via Cloudflare Workers Builds.
2. **.NET 8 Web API via Docker Container** — can be deployed behind Cloudflare (Cloudflare Tunnel, Container platforms, Azure Container Apps, or AWS ECS with Cloudflare DNS/CDN proxy).

---

## 1. .NET 8 Web Application

- `WebApplicationTest.csproj`: ASP.NET Core 8 minimal web API project.
- `Program.cs`: Exposes `/api/health` and `/api/info`.
- `Dockerfile`: Multi-stage production container build using official Microsoft .NET 8 images (`mcr.microsoft.com/dotnet/sdk:8.0` and `aspnet:8.0`).
- Runs on port `8080` under a secure non-root user.

### Building & Running Docker Locally
```bash
docker build -t web-application-test:latest .
docker run -p 8080:8080 web-application-test:latest
# Test: curl http://localhost:8080/api/health
```

---

## 2. Deploying .NET Docker Containers with Cloudflare

### Key Concept: Cloudflare Workers vs. Docker
- **Cloudflare Workers** runs V8 JavaScript/Wasm isolates, **not Docker containers** or the full .NET runtime directly.
- **To run .NET Docker apps with Cloudflare**:
  - **Option A (Cloudflare Tunnel - Recommended for Zero Public IP / Hybrid Cloud)**: Run your Docker container anywhere (Azure, AWS, GCP, or on-prem) and run `cloudflared` (Cloudflare Tunnel) alongside it. Cloudflare routes global edge traffic directly to your container securely without exposing firewall ports.
  - **Option B (Cloudflare CDN / Proxy)**: Host your container on Azure Container Apps / App Service / Kubernetes and set Cloudflare as your reverse proxy / DNS with Orange Cloud (`Proxied`) enabled for edge caching, DDoS protection, and WAF.
  - **Option C (GitHub Actions CI/CD to GitHub Container Registry / Docker Hub / ACR)**: Build and publish the Docker container automatically when PRs merge into `main`.
