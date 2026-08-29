# gooodeat-site

Site vitrine de **gooodeat** (www.gooodeat.com) — sortie de Framer.

- **Stack** : Astro statique + `@astrojs/sitemap`.
- **Hébergement** : GitHub Pages (déploiement auto via GitHub Actions sur `main`).
- **Domaine** : www.gooodeat.com (DNS chez Infomaniak, CNAME dans `public/CNAME`).

## Développer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```

## Contenu

Le contenu éditorial vit dans `src/data/site.ts`. Les pages sont dans `src/pages/`.
Assets réels dans `public/img/` (illustrations) et `public/img/fr/` (assets récupérés
du site publié : cadre iPhone, calques burger, icônes 3D, captures d'app).

## Règles de marque

Tutoiement, écriture inclusive (point médian), pas de tirets cadratins, « ton assistant
Floris » (jamais « notre IA »), jamais de calories/macros/grammes, teal réservé à Floris.

Liens stores : iOS `apps.apple.com/app/habitude-gooodeat/id6770682706` ·
Android `play.google.com/store/apps/details?id=com.gooodeat.app`.
