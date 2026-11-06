# Cloudflare CI/CD Test Application

A web application configured for automated CI/CD deployment on **Cloudflare Workers Builds** (Workers with Static Assets).

Whenever a commit is pushed to the GitHub repository, Cloudflare listens for the commit webhook, runs the build command, and deploys the output automatically to Cloudflare's global edge network.

---

## Project Structure

```
├── public/
│   └── favicon.svg          # Favicon asset
├── src/
│   ├── main.ts              # Frontend TypeScript entry
│   ├── styles.css           # Styling
│   └── worker.ts            # Worker script (API handler + asset fetcher)
├── index.html               # Single-page HTML shell
├── package.json             # Scripts & dependencies (Vite + TypeScript)
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration (outputs to dist/)
└── wrangler.toml            # Cloudflare Workers configuration
```

---

## Cloudflare Workers Builds Configuration

In `wrangler.toml`:
```toml
name = "web-application-test"
compatibility_date = "2024-11-01"
compatibility_flags = ["nodejs_compat"]

main = "src/worker.ts"
assets = { directory = "./dist" }
```

In the Cloudflare dashboard:
- **Build command**: `npm run build`
- **Deploy command**: `npx wrangler deploy` (default for Workers Builds)
