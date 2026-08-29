#!/usr/bin/env node
/**
 * Régénère src/data/plats-scans.json depuis les scans gooodeat (agrégés + anonymisés).
 *
 * Source : fonction SQL public.plats_agrege(min_users) exposée à anon, avec un
 * plancher de k-anonymat (>=5 personnes). Aucune donnée individuelle n'est lue.
 *
 * Clés via variables d'environnement (jamais en dur, règle studio Doppler) :
 *   SUPABASE_URL       ex: https://elhpaihcnjfunuypktxl.supabase.co
 *   SUPABASE_ANON_KEY  clé publique (publishable/anon), non sensible
 *
 * Usage :
 *   doppler run -p gsv05 -c dev -- node scripts/generate-plats.mjs
 *   (ou en CI avec les deux variables définies)
 *
 * Le script met à jour les CHIFFRES (familles + communaute). L'éditorial des
 * fiches /plats/*.md (answer, equilibrer, faq, corps) n'est jamais écrasé.
 * Toute nouvelle fiche est créée en draft:true (relecture Anne-Charlotte).
 */
import { writeFile, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_ANON_KEY;
if (!URL || !KEY) {
  console.error('Manque SUPABASE_URL / SUPABASE_ANON_KEY (passe par doppler run).');
  process.exit(1);
}

// Allowlist : quels plats deviennent des pages, et leur slug/titre.
// On exclut volontairement les libellés génériques ("assiette variée", etc.).
const ALLOW = {
  'spaghetti bolognaise': { slug: 'spaghetti-bolognaise', titre: 'Spaghetti bolognaise' },
  'salade de pâtes': { slug: 'salade-de-pates', titre: 'Salade de pâtes' },
  'sandwich jambon fromage': { slug: 'sandwich-jambon-fromage', titre: 'Sandwich jambon fromage' },
  'pâtes sauce tomate': { slug: 'pates-sauce-tomate', titre: 'Pâtes sauce tomate' },
  'salade tomate mozzarella': { slug: 'salade-tomate-mozzarella', titre: 'Salade tomate mozzarella' },
  'saumon et légumes': { slug: 'saumon-et-legumes', titre: 'Saumon et légumes' },
  'soupe de légumes': { slug: 'soupe-de-legumes', titre: 'Soupe de légumes' },
  'salade de lentilles': { slug: 'salade-de-lentilles', titre: 'Salade de lentilles' },
};

const COLORS = {
  'Légumes': '#21bf2b', 'Protéines': '#ff8000', 'Féculents': '#c9a25b',
  'Fruits': '#e0567d', 'Matières grasses': '#b0b0b0',
};

function familles(row) {
  const raw = [
    { nom: 'Légumes', part: row.legumes },
    { nom: 'Protéines', part: row.proteines },
    { nom: 'Féculents', part: row.feculents },
    { nom: 'Fruits', part: row.fruits },
    { nom: 'Matières grasses', part: row.graisses },
  ].filter((f) => f.part >= 5) // on masque les familles négligeables
   .sort((a, b) => b.part - a.part)
   .map((f) => ({ ...f, couleur: COLORS[f.nom] }));
  return raw;
}

const res = await fetch(`${URL}/rest/v1/rpc/plats_agrege`, {
  method: 'POST',
  headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ min_users: 5 }),
});
if (!res.ok) { console.error('RPC échouée', res.status, await res.text()); process.exit(1); }
const rows = await res.json();

const plats = {};
for (const row of rows) {
  const meta = ALLOW[row.plat];
  if (!meta) continue;
  plats[meta.slug] = { communaute: { scans: Number(row.scans), users: Number(row.users) }, familles: familles(row) };
}

const snapshot = {
  _note: 'Snapshot AGRÉGÉ et ANONYMISÉ des scans gooodeat (public.plats_agrege, k>=5). Régénéré par scripts/generate-plats.mjs. Ne PAS éditer à la main.',
  _generatedFrom: 'supabase rpc plats_agrege',
  _snapshotDate: new Date().toISOString().slice(0, 10),
  plats,
};
await writeFile(join(ROOT, 'src/data/plats-scans.json'), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Snapshot écrit : ${Object.keys(plats).length} plats.`);

// Scaffolde une fiche brouillon pour tout plat retenu sans .md existant.
const dir = join(ROOT, 'src/content/plats');
const existing = new Set((await readdir(dir)).map((f) => f.replace(/\.md$/, '')));
for (const [name, meta] of Object.entries(ALLOW)) {
  if (!plats[meta.slug]) continue; // pas assez de scans pour l'instant
  if (existing.has(meta.slug)) continue;
  const md = `---
title: "${meta.titre} : composition et comment l'équilibrer"
description: "${meta.titre} décrypté à partir des scans de la communauté gooodeat."
draft: true
updated: ${snapshot._snapshotDate}
dataKey: ${meta.slug}
answer: "À compléter (relecture Anne-Charlotte)."
equilibrer: []
faq: []
sources:
  - label: "Conseil Supérieur de la Santé (Belgique), 2019"
    url: "https://www.health.belgium.be"
related:
  - manger-equilibre-sans-compter-les-calories
---

Brouillon généré automatiquement depuis les scans. À rédiger et valider.
`;
  await writeFile(join(dir, `${meta.slug}.md`), md);
  console.log(`Fiche brouillon créée : ${meta.slug}.md`);
}
