import { staticFile } from "remotion";

// Teasing : un seul bleu (celui de l'ancien logo) et du blanc ; ancien logo passé en blanc.
// Seule touche de couleur, à la toute fin : la barre dorée du nouveau G (logo blanc, barre dorée).
export const C = { encre: "#05384B", encreFonce: "#05384B", accent: "#FFFFFF", blanc: "#FFFFFF" };
export const NOUVEAU = { bleu: "#2F4A71", or: "#D9AE57" };
// Le fond passe progressivement de l'ancien bleu (logo actuel) au nouveau bleu (charte V4) au fil de la vidéo
export const BLEU_ANCIEN = "#05384B";
export const BLEU_NOUVEAU = NOUVEAU.bleu;
export const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

export const PHOTOS = Array.from({ length: 23 }, (_, i) => staticFile(`medias/flashback-${i + 1}.jpg`));
export const MEDIA = {
  ancienLogo: staticFile("medias/ancien-logo-blanc.png"),   // version blanche officielle
};

// Textes : « | » = retour à la ligne, *mot* = mot en doré
export const TEXTES = {
  annee: "2007.",
  ouverture: "Des agences indépendantes|réunies pour collaborer",
  phrases: [
    "Des|conventions.",
    "Des|rencontres.",
    "Des réussites|partagées.",
    "Près de *450*|agences|partenaires.",
    "Un même|collectif.",
  ],
  vingt: "ans,|*bientôt.*",
  evolue: "Et le Groupe évolue.",
  chapitre: "Un nouveau|chapitre|*s’ouvre…*",
  rdv: "Rendez-vous",
  date: "lundi|*19 octobre*",
  savoirPlus: "pour en savoir plus.",
  fin: "Rendez-vous le lundi 19 octobre.",
  site: "groupenationalimmobilier.fr",
};

// Vignettes du mur : [photo, zoom, cadrage X %, cadrage Y %] — 5 rangées × 8 vignettes, toutes différentes
// (index des photos : 0 convention · 4 photo de groupe · 10 plénière · 12 coupe · 17 déco · 20 équipe · 22 public…)
export const VIGNETTES: [number, number, number, number][] = [
  [0, 1, 50, 50], [11, 1, 50, 50], [16, 1, 50, 50], [2, 1.8, 42, 30], [9, 1, 50, 50], [14, 1, 50, 50], [21, 1, 50, 50], [5, 1, 50, 50],
  [12, 1, 50, 50], [1, 1, 50, 50], [19, 1, 50, 50], [10, 2, 40, 50], [6, 1, 50, 50], [22, 1.8, 55, 45], [3, 1, 50, 50], [13, 1, 50, 50],
  [4, 1, 50, 50], [18, 1, 50, 50], [0, 2.6, 96, 52], [15, 1, 50, 50], [8, 1, 50, 50], [11, 1.8, 50, 45], [20, 1, 50, 50], [7, 1, 50, 50],
  [22, 1, 50, 50], [13, 2, 30, 50], [17, 1, 50, 50], [4, 2, 22, 40], [10, 1, 50, 50], [12, 1.8, 40, 35], [2, 1, 50, 50], [16, 2, 50, 70],
  [20, 1.8, 50, 35], [5, 1.6, 30, 30], [14, 2, 30, 60], [19, 1.8, 45, 50], [21, 1.8, 85, 60], [15, 1.8, 40, 45], [4, 2, 80, 40], [3, 2, 50, 78],
];
// Photos qui défilent dans le « 20 » (visages bien visibles)
export const PHOTOS_20 = [12, 4, 22, 11, 14, 19, 5, 20];
