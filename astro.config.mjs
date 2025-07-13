// astro.config.mjs - With sitemap and robots.txt integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://www.binyousufgroup.com',
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true
    }),
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/']
        }
      ]
    })
  ],

  output: 'server',
  adapter: vercel(),
  
  vite: {
    build: {
      rollupOptions: {
        output: {
          globals: {
            'gsap/ScrollToPlugin': 'ScrollToPlugin'
          }
        }
      }
    },
    ssr: {
      noExternal: ['gsap', 'googleapis']
    }
  }
});