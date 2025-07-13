// astro.config.mjs - Without sitemap integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.binyousufgroup.com',
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true
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