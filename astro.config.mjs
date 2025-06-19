// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false // Keep your custom global styles
    })
  ],

  output: 'static',

  vite: {
    define: {
      'import.meta.env.DEV': JSON.stringify(process.env.NODE_ENV === 'development')
    }
  },

  adapter: vercel()
});