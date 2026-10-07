# Reel nouveau logo GNI — version Remotion

Vidéo 1080 × 1920, 30 s, 30 i/s, construite avec Remotion (React).

- `src/theme.ts` : couleurs de la charte, textes, choix des vignettes du mur de photos
- `src/Scenes.tsx` : les 6 scènes (2007 · mur de souvenirs · « 20 » photo · passage de logo · groupement/réseau · fin)
- `src/GniReel.tsx` : enchaînement et transitions (glissé, fondu, balayage circulaire, volet)

Rendu :

```bash
npm install
npx remotion studio            # prévisualisation interactive
npx remotion render src/index.ts GniReel out/GNI-nouveau-logo-reel.mp4
```
