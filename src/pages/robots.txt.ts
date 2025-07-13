// src/pages/robots.txt.ts - Server-side robots.txt endpoint
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.origin || 'https://www.binyousufgroup.com';

  const robotsTxt = `User-agent: *
Allow: /

Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
