export async function onRequest(context: { request: Request }) {
  const url = new URL(context.request.url);
  const data = {
    status: 'ok',
    message: 'Hello from Cloudflare Edge Function!',
    timestamp: new Date().toISOString(),
    path: url.pathname,
    colo: (context.request as any).cf?.colo ?? 'local-preview',
    country: (context.request as any).cf?.country ?? 'unknown',
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'cache-control': 'no-store',
    },
  });
}
