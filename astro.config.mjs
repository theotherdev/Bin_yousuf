// astro.config.mjs - With sitemap and robots.txt integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
// Removed @astrojs/sitemap - using custom SSR endpoint instead
// Removed astro-robots-txt - using custom SSR endpoint instead

export default defineConfig({
  site: 'https://www.binyousufgroup.com',
  
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true
    }),
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
    },
    server: {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-XSS-Protection': '1; mode=block'
      }
    }
  }
});