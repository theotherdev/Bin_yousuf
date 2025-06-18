// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false // Keep your custom global styles
    })
  ],
  output: 'server',
  vite: {
    define: {
      'import.meta.env.DEV': JSON.stringify(process.env.NODE_ENV === 'development')
    }
  }
});