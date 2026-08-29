// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site public Gooodeat. Le domaine sert au sitemap et aux URLs canoniques.
export default defineConfig({
  site: 'https://www.gooodeat.com',
  integrations: [
    sitemap({
      // Sitemap propre : on ne veut QUE des pages réelles.
      // On tue les gabarits/brouillons (le drame de l'ancien site Framer :
      // stories fictives anglaises + articles template "200k downloads").
      filter: (page) => !page.includes('/brouillon/'),
    }),
  ],
  build: {
    // HTML par page = URLs propres (/prix/ et pas /prix.html)
    format: 'directory',
  },
});
