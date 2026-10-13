import { staticFile } from "remotion";

// Charte V4 : bleu dominant, blanc pour l'air, doré en accent
export const C = { bleu: "#2F4A71", bleuFonce: "#1F314D", or: "#D9AE57", blanc: "#FFFFFF" };
export const FONT = "Montserrat, 'Helvetica Neue', Arial, sans-serif";

export const PHOTOS = [1, 2, 3, 4, 5].map((i) => staticFile(`medias/flashback-${i}.jpg`));
export const MEDIA = {
  ancienLogo: staticFile("medias/ancien-logo.png"),
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

// Vignettes du mur : [photo, zoom, cadrage X %, cadrage Y %]
export const VIGNETTES: [number, number, number, number][] = [
  [0, 1, 50, 50], [4, 2, 22, 40], [2, 1.8, 42, 30], [3, 1, 50, 50], [1, 1, 50, 50], [0, 2.6, 96, 52],
  [4, 1, 50, 50], [2, 2.2, 62, 66], [1, 2, 45, 62], [3, 2, 50, 78], [0, 2, 14, 62], [4, 2, 80, 40],
  [2, 1, 50, 50], [1, 2.4, 60, 88], [3, 2.6, 95, 45], [4, 2, 50, 55],
];
