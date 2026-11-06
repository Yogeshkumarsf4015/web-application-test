# Cloudflare CI/CD Test Application

A lightweight web application configured for automatic CI/CD deployment on **Cloudflare Workers Builds** (and **Cloudflare Pages**).

Whenever a commit is pushed to the GitHub repository, Cloudflare listens for the commit webhook, runs the build command, and deploys the output automatically to Cloudflare's global edge network.

---

## Project Structure

```
├── functions/
│   └── api/
│       └── health.ts        # Cloudflare Pages / Workers Edge Function
├── public/
│   └── favicon.svg          # Favicon asset
├── src/
│   ├── main.ts              # Frontend TypeScript entry
│   └── styles.css           # Styling
├── index.html               # Single-page HTML shell
├── package.json             # Scripts & dependencies (Vite + TypeScript)
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration (outputs to dist/)
└── wrangler.toml            # Cloudflare Workers / Pages configuration
```

---

## Cloudflare CI/CD Configuration Details

When connecting this repository in the Cloudflare dashboard:

| Setting | Value |
|---|---|
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (root) |
| **Node.js version (optional)** | `20` or `22` (set env var `NODE_VERSION=20`) |

---

## Pipeline Comparison: Azure Pipelines vs Cloudflare

| Stage | Azure Pipelines + Docker Setup | Cloudflare Workers Builds Setup |
|---|---|---|
| **Trigger** | GitHub push triggers Azure webhook | GitHub push triggers Cloudflare webhook via GitHub App |
| **Build runner** | Azure DevOps agent pulls code, builds Docker container | Cloudflare sandboxed build runner (`npm install && npm run build`) |
| **Artifact** | Docker image pushed to Azure Container Registry (ACR) | Static bundle (`dist/`) + compiled V8 edge functions |
| **Deployment** | Azure App Service / AKS / Container App restarts container | Instant zero-downtime global edge propagation (< 10s) |
| **Infrastructure** | VMs / Containers in chosen Azure region(s) | 330+ edge locations worldwide out of the box |
| **SSL / CDN** | Needs Application Gateway, Front Door or Azure CDN | Automatic SSL certificate & CDN included by default |
