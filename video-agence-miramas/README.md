# Vidéo de présentation — Agence SG Conseil & Patrimoine (Miramas)

Première agence passée sous licence de marque Groupe National Immobilier.
Reel vertical 1080 × 1920, 30 i/s, environ 50 s, construit avec Remotion.

## Déroulé

| # | Plan | Contenu |
|---|---|---|
| 1 | Nans Bellanger face caméra, puis photo de la façade en panoramique | Présentation du tournage, titre « Agence SG Conseil & Patrimoine · Miramas » |
| 2 | Interview Stephan Garcin | « Une agence basée sur Miramas depuis 15 ans » |
| 3 | Interview | « Nous continuons à accompagner avec un interlocuteur unique sur la gestion de patrimoine, y compris immobilière » |
| 4 | Interview + gros plan enseigne | « Nous passons le cap de rejoindre le Groupe National Immobilier sous licence » |
| 5 | Interview, zoom avant unique sur Stephan | « Une véritable fierté… indépendant tout en rejoignant un réseau national » |
| 6 | Poignée de main | « Merci, à bientôt. » |
| 7 | Écran de fin marine | Logo GNI blanc, « Bienvenue à l'agence SG Conseil & Patrimoine · Miramas » |

## Fichiers

- `src/theme.ts` : couleurs, noms et fonctions, sous-titres mot à mot (texte et timing modifiables)
- `src/AgenceMiramas.tsx` : montage (points d'entrée/sortie de chaque plan, musique)
- `src/Overlays.tsx` : sous-titres, bandeaux nom/fonction, titre agence, écran de fin
- `public/clips/` : rushs remis à la verticale 1080 × 1920, voix normalisées
- `public/medias/musique.m4a` : musique de fond composée pour la vidéo (libre de droits)

## Rendu

```bash
npm install
npx remotion studio
npx remotion render src/index.ts AgenceMiramas out/GNI-agence-SG-Miramas.mp4
```
