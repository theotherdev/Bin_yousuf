// src/pages/sitemap.xml.ts - Server-side sitemap endpoint
import type { APIRoute } from 'astro';
import { projects } from '../data/projects';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.origin || 'https://www.binyousufgroup.com';
  
  const staticPages = [
    '',
    '/about',
    '/privacy-policy'
  ];
  
  const projectPages = projects.map(project => `/projects/${project.id}`);
  
  const allPages = [...staticPages, ...projectPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => 
  `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'weekly' : page.startsWith('/projects/') ? 'monthly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/projects/') ? '0.8' : '0.7'}</priority>
  </url>`
).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};