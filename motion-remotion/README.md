# Reel teasing nouvelle identité GNI — version Remotion

Vidéo 1080 × 1920, 27 s, 30 i/s, construite avec Remotion (React).
Style volontairement neutre : fond qui passe progressivement de l'ancien bleu (#05384B) au nouveau (#2F4A71), ancien logo en blanc, police Inter pour ne rien dévoiler de la nouvelle charte.

- `src/theme.ts` : couleurs de la charte, textes, choix des vignettes du mur de photos
- `src/Scenes.tsx` : les 5 scènes (2007 · mur de souvenirs · « 20 » photo · « Un nouveau chapitre s’ouvre… Rendez-vous lundi 19 octobre » · fin : zoom sur le G de l’ancien logo qui se transforme en G du nouveau logo, puis recul : la barre dorée devient la capsule centrale d’un champ de capsules)
- `src/gShapes.ts` : contours vectorisés des deux G (morphing avec flubber)
- `src/GniReel.tsx` : enchaînement et transitions (glissé, fondu, balayage circulaire, volet)

Rendu :

```bash
npm install
npx remotion studio            # prévisualisation interactive
npx remotion render src/index.ts GniReel out/GNI-nouveau-logo-reel.mp4
```
