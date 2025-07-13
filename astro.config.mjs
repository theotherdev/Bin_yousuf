// astro.config.mjs - With sitemap and robots.txt integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
// Removed @astrojs/sitemap - using custom SSR endpoint instead
// Removed astro-robots-txt - using custom SSR endpoint instead

export default defineConfig({
  site: 'https://www.binyousufgroup.com',
  
  // Disable image optimization since images are already optimized WebP
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  
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
    }
  }
});