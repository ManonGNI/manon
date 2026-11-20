# Vidéo de présentation — Alexandra l'Immobilier en Provence

Agence partenaire du Groupe National Immobilier (Pernes-les-Fontaines et Beaumes-de-Venise).
Reel vertical 1080 × 1920, 30 i/s, environ 50 s, construit avec Remotion, même style que `video-agence-miramas`.

## Déroulé

| # | Plan | Contenu |
|---|---|---|
| 1 | Loïc Fauchet devant l'agence | Présentation de l'agence et de ses deux sites |
| 2 | Interview, plan large | « J'ai commencé l'immobilier il y a 25 ans », « connaître le projet… et la personne en face de soi » |
| 3 | Interview, plan large | « La proximité, j'aime bien avoir le contact humain » |
| 4 | Fondu enchaîné vers un plan serré sur Alexandra | « Une agence isolée, seule dans son coin, ce n'est plus d'actualité » |
| 5 | Plan serré | « On se sent vraiment accompagné… esprit avant-gardiste » |
| 6 | Plan large | « Merci au groupement, merci à tous les adhérents » |
| 7 | Écran de fin marine animé | « Bienvenue à l'agence », Alexandra l'Immobilier en Provence, villes, logo GNI |

## Fichiers

- `src/theme.ts` : noms et fonctions, nom de l'agence, sous-titres mot à mot
- `src/AgenceAlexandra.tsx` : montage, plan serré, fondu
- `src/Overlays.tsx` : sous-titres, bandeaux, logo, écran de fin
- `public/clips/` : passages découpés dans les rushs (voir les instants dans `theme.ts`)

## Rendu

```bash
npm install
npx remotion render src/index.ts AgenceAlexandra out/GNI-agence-Alexandra.mp4
```
