// astro.config.mjs - With sitemap integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.binyousufgroup.com',
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true
    }),
    sitemap()
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