// Cloudflare Pages Function to handle SPA routing
export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // If requesting a file with extension, pass through
  if (url.pathname.match(/\.[a-z0-9]+$/i)) {
    return context.next();
  }
  
  // For all other routes, serve index.html
  const response = await context.env.ASSETS.fetch(new URL('/index.html', url.origin));
  return new Response(response.body, {
    ...response,
    headers: {
      ...Object.fromEntries(response.headers),
      'Content-Type': 'text/html;charset=UTF-8',
    }
  });
}
