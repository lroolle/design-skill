/**
 * design-skill site worker.
 *
 * The page lives at lroolle.com/design-skill, but site/ is authored as a
 * self-contained directory with relative paths so it also works at a root.
 * This worker is the only thing that knows about the base path: it strips the
 * prefix before handing the request to the assets binding, so the same build
 * serves correctly at
 *
 *   https://lroolle.com/design-skill/        (zone route, prefix stripped)
 *   https://design-skill.1lm.workers.dev/    (workers.dev, no prefix)
 *
 * No other file in the repo hard-codes the path.
 */
const BASE = '/design-skill';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // /design-skill -> /design-skill/ so relative asset paths resolve
    if (url.pathname === BASE) {
      return Response.redirect(`${url.origin}${BASE}/${url.search}`, 301);
    }

    if (url.pathname.startsWith(`${BASE}/`)) {
      url.pathname = url.pathname.slice(BASE.length) || '/';
    }

    const response = await env.ASSETS.fetch(new Request(url, request));

    // the sheets are static; let the edge and the browser keep them briefly,
    // and revalidate the document so a redeploy is visible immediately
    const headers = new Headers(response.headers);
    const isDoc = (headers.get('content-type') || '').startsWith('text/html');
    headers.set('cache-control', isDoc ? 'public, max-age=0, must-revalidate' : 'public, max-age=3600');
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');

    return new Response(response.body, { status: response.status, headers });
  },
};
