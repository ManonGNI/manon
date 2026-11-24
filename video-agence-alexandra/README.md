# Vidéo de présentation — Alexandra l'Immobilier en Provence

Agence partenaire du Groupe National Immobilier (Pernes-les-Fontaines et Beaumes-de-Venise).
Deux reels verticaux 1080 × 1920, 30 i/s, construit avec Remotion, même style que `video-agence-miramas`.

## Vidéo 1 — Bienvenue à l'agence (`AgenceAlexandra`, ~54 s)

Alexandra, son parcours et sa vision du métier (aucun passage d'interview commun avec la vidéo 2).

| # | Plan | Contenu |
|---|---|---|
| 1 | Loïc Fauchet devant l'agence (recadré, éclairci) | Présentation de l'agence et de ses deux sites |
| 2 | Loïc en plan serré, puis plan large | « Comment vous avez commencé l'immobilier ? » → « Il y a 25 ans » |
| 3 | Loïc en plan serré, puis Alexandra en plan serré | « Qu'est-ce qui vous fait vibrer dans ce métier ? » → « Le service et le conseil… savoir écouter le projet du client » |
| 4 | Plan large | « Connaître le projet… et la personne en face de soi » |
| 5 | Plan large, puis fondu vers plan serré | « Renforcer ce lien pour se démarquer de la technologie, avec Google, l'IA » |
| 6 | Plan large | « Merci au groupement, merci à tous les adhérents » |
| 7 | Écran de fin marine animé (version agence partenaire) | « Bienvenue à » Alexandra l'Immobilier en Provence, villes, puis « Agence partenaire du » + logo GNI |

## Vidéo 2 — Témoignage « Pourquoi rejoindre un groupement ? » (`TemoignageAlexandra`, ~40 s)

| # | Plan | Contenu |
|---|---|---|
| 1 | Plan serré, titre d'accroche | « Une agence isolée, seule dans son coin, ce n'est plus d'actualité » |
| 2 | Loïc en plan serré | « Pourquoi avoir rejoint le groupement ? » |
| 3 | Plan large | « La proximité, j'aime bien avoir le contact humain » |
| 4 | Fondu vers plan serré | « Mes valeurs, l'humanité, l'écoute » |
| 5 | Plan large puis serré | « Il vaut mieux être en communauté, pour faire nos forces entre nous » |
| 6 | Plan large | « On se sent vraiment accompagné… esprit avant-gardiste » |
| 7 | Écran de fin marine animé | « Rejoignez le groupement », agences immobilières indépendantes, site, logo GNI |

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
