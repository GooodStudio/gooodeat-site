// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site public Gooodeat. Le domaine sert au sitemap et aux URLs canoniques.
export default defineConfig({
  site: 'https://www.gooodeat.com',
  integrations: [
    sitemap({
      // Sitemap propre : on ne veut QUE des pages réelles et publiées.
      // On tue les gabarits/brouillons (le drame de l'ancien site Framer).
      filter: (page) => {
        if (page.includes('/brouillon/')) return false;
        // Phase de seeding SEO : les fiches guides/plats sont en relecture
        // (noindex) tant qu'Anne-Charlotte n'a pas validé la science.
        // On les garde hors sitemap jusqu'à validation (à réactiver ensuite).
        if (/\/(guides|plats)\//.test(page)) return false;
        return true;
      },
    }),
  ],
  build: {
    // HTML par page = URLs propres (/prix/ et pas /prix.html)
    format: 'directory',
  },
});
