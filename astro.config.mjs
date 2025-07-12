// astro.config.mjs - Without sitemap integration
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

// Load environment variables
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  site: 'https://www.binyousufgroup.com',
  
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ],

  output: 'server',
  adapter: vercel(),
  
  vite: {
    define: {
      'process.env.GOOGLE_SHEET_ID': JSON.stringify(env.GOOGLE_SHEET_ID),
      'process.env.GOOGLE_PROJECT_ID': JSON.stringify(env.GOOGLE_PROJECT_ID),
      'process.env.GOOGLE_PRIVATE_KEY_ID': JSON.stringify(env.GOOGLE_PRIVATE_KEY_ID),
      'process.env.GOOGLE_PRIVATE_KEY': JSON.stringify(env.GOOGLE_PRIVATE_KEY),
      'process.env.GOOGLE_CLIENT_EMAIL': JSON.stringify(env.GOOGLE_CLIENT_EMAIL),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(env.GOOGLE_CLIENT_ID),
      'process.env.GOOGLE_CLIENT_X509_CERT_URL': JSON.stringify(env.GOOGLE_CLIENT_X509_CERT_URL),
    },
    build: {
      rollupOptions: {
        external: ['googleapis']
      }
    }
  }
});