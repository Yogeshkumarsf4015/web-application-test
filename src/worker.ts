export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API endpoint handler
    if (url.pathname === '/api/health') {
      const data = {
        status: 'ok',
        message: 'Hello from Cloudflare Workers Builds!',
        timestamp: new Date().toISOString(),
        path: url.pathname,
        colo: (request as any).cf?.colo ?? 'edge',
        country: (request as any).cf?.country ?? 'unknown',
      };
      return new Response(JSON.stringify(data, null, 2), {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'cache-control': 'no-store',
        },
      });
    }

    // Pass all other requests to the static assets bundle in dist/
    return env.ASSETS.fetch(request);
  },
};
