/**
 * Same-origin proxy for WoWs API (Vercel Edge).
 * Browser → /api/... → upstream (server-side fetch, no CORS).
 */
export const config = { runtime: 'edge' };

const DEFAULT_UPSTREAM = 'https://wows-proxy.tim-klimenkoo.workers.dev/api';

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const upstream = (process.env.WOWS_API_UPSTREAM || DEFAULT_UPSTREAM).replace(
    /\/$/,
    '',
  );
  const { pathname, search } = new URL(request.url);
  const subPath = pathname.replace(/^\/api\/?/, '').replace(/^\/+/, '');
  const targetUrl =
    subPath.length > 0 ? `${upstream}/${subPath}${search}` : `${upstream}${search}`;

  try {
    const upstreamRes = await fetch(targetUrl, {
      method: request.method,
      headers: { Accept: 'application/json, */*' },
    });

    const contentType =
      upstreamRes.headers.get('content-type') || 'application/json';

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
      },
    });
  } catch {
    return new Response(JSON.stringify({ status: 'error', error: 'upstream_fetch_failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
