# Vidéo de présentation — Alexandra l'Immobilier en Provence

Agence partenaire du Groupe National Immobilier (Pernes-les-Fontaines et Beaumes-de-Venise).
Deux reels verticaux 1080 × 1920, 30 i/s, construit avec Remotion, même style que `video-agence-miramas`.

## Vidéo 1 — Bienvenue à l'agence (`AgenceAlexandra`, ~44 s)

| # | Plan | Contenu |
|---|---|---|
| 1 | Loïc Fauchet devant l'agence (recadré, éclairci) | Présentation de l'agence et de ses deux sites |
| 2 | Interview, plan large | « J'ai commencé l'immobilier il y a 25 ans », « connaître le projet… et la personne en face de soi » |
| 3 | Interview, plan large | « La proximité, j'aime bien avoir le contact humain » |
| 4 | Fondu enchaîné vers un plan serré sur Alexandra | « On se sent vraiment accompagné… esprit avant-gardiste » |
| 5 | Plan large | « Merci au groupement, merci à tous les adhérents » |
| 6 | Écran de fin marine animé | « Bienvenue à l'agence », Alexandra l'Immobilier en Provence, villes, logo GNI |

## Vidéo 2 — Témoignage « Pourquoi rejoindre un groupement ? » (`TemoignageAlexandra`, ~39 s)

| # | Plan | Contenu |
|---|---|---|
| 1 | Plan serré, titre d'accroche | « Une agence isolée, seule dans son coin, ce n'est plus d'actualité » |
| 2 | Plan large | « La proximité, j'aime bien avoir le contact humain » |
| 3 | Fondu vers plan serré | « Mes valeurs, l'humanité, l'écoute » |
| 4 | Plan large puis serré | « Il vaut mieux être en communauté, pour faire nos forces entre nous » |
| 5 | Plan large | « On se sent vraiment accompagné… esprit avant-gardiste » |
| 6 | Écran de fin marine animé | « Rejoignez le groupement », agences immobilières indépendantes, site, logo GNI |

## Fichiers

- `src/theme.ts` : noms et fonctions, nom de l'agence, sous-titres mot à mot
- `src/AgenceAlexandra.tsx` : vidéo 1
- `src/TemoignageAlexandra.tsx` : vidéo 2
- `src/montage.tsx` : plan serré, fondu, outils communs
- `src/Overlays.tsx` : sous-titres, bandeaux, logo, écran de fin
- `public/clips/` : passages découpés dans les rushs (voir les instants dans `theme.ts`)

## Rendu

```bash
npm install
npx remotion render src/index.ts AgenceAlexandra out/GNI-agence-Alexandra.mp4
npx remotion render src/index.ts TemoignageAlexandra out/GNI-temoignage-Alexandra.mp4
```
