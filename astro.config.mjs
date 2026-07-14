// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-premium-blog.vercel.app',
  integrations: [
    react(), 
    mdx(), 
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      Image: false, // We use Astro's built-in optimized image assets
      JavaScript: true,
      SVG: true,
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});