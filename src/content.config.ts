import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schéma commun aux contenus SEO/GEO.
// draft: true => page en relecture (noindex, hors sitemap, hors listings) tant
// qu'Anne-Charlotte n'a pas validé la science (règle studio : la science se
// valide avant publication).
const base = {
  title: z.string(),
  description: z.string(),
  draft: z.boolean().default(true),
  updated: z.coerce.date().optional(),
  // Résumé factuel auto-portant : sert le GEO (repris par les moteurs génératifs).
  answer: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), r: z.string() })).default([]),
  sources: z.array(z.object({ label: z.string(), url: z.string().optional() })).default([]),
  related: z.array(z.string()).default([]),
  reviewedBy: z.string().default('Anne-Charlotte, diététicienne'),
};

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({ ...base }),
});

const plats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plats' }),
  schema: z.object({
    ...base,
    // Composition qualitative typique (part par famille), agrégée/anonymisée.
    familles: z
      .array(z.object({ nom: z.string(), part: z.number(), couleur: z.string().optional() }))
      .default([]),
    equilibrer: z.array(z.string()).default([]), // conseils "comment rééquilibrer"
    // Données communauté agrégées et anonymisées (issues des scans gooodeat).
    communaute: z.object({ scans: z.number(), users: z.number() }).optional(),
    // Si présent, familles + communaute sont lues depuis src/data/plats-scans.json
    // (snapshot régénéré depuis les scans). L'éditorial reste dans le .md.
    dataKey: z.string().optional(),
  }),
});

export const collections = { guides, plats };
