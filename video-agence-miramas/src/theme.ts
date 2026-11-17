import { staticFile } from "remotion";

// Charte GNI : marine dominant, or en accent rare, blanc
export const C = { marine: "#2B4258", or: "#D9AE57", blanc: "#FFFFFF" };
export const FONT = "Montserrat, 'Helvetica Neue', Arial, sans-serif";

export const MEDIA = {
  intro: staticFile("clips/intro-nans.mp4"),
  facade: staticFile("clips/facade.mp4"),
  facadePhoto: staticFile("medias/facade-photo.jpg"), // photo de face IMG_5023 (3072 × 2304)
  enseigne: staticFile("clips/enseigne.mp4"),
  plaque: staticFile("clips/plaque.mp4"),
  interview: staticFile("clips/interview.mp4"),
  conclusion: staticFile("clips/conclusion.mp4"),
  logoBlanc: staticFile("medias/logo-gni-blanc.png"),
};

export const PERSONNES = {
  nans: { nom: "Nans Bellanger", role: "Responsable développement", structure: "Groupe National Immobilier" },
  stephan: { nom: "Stephan Garcin", role: "Co-gérant", structure: "Agence SG Conseil & Patrimoine" },
};

// Sous-titres mot à mot : [mot, début s, fin s] en temps du fichier source.
// Chaque ligne = un groupe de mots affiché ensemble ; le surlignage or suit le mot prononcé.
export type Mot = [string, number, number];

export const SOUS_TITRES: Record<string, Mot[][]> = {
  intro: [
    [["Nous", 0.00, 0.48], ["sommes", 0.48, 0.70], ["aujourd’hui", 0.70, 1.18], ["à", 1.18, 1.32], ["Miramas", 1.32, 1.82]],
    [["pour", 1.82, 2.58], ["rencontrer", 2.58, 3.34], ["Stephan,", 3.34, 4.06]],
    [["directeur", 4.42, 4.74], ["associé", 4.74, 5.06], ["de", 5.06, 5.18], ["l’agence", 5.18, 5.62]],
    [["SG", 5.62, 5.92], ["Conseil", 5.92, 6.28], ["&", 6.28, 6.40], ["Patrimoine,", 6.40, 6.96]],
    [["qui", 7.52, 7.56], ["va", 7.56, 7.70], ["nous", 7.70, 7.86], ["faire", 7.86, 8.14], ["découvrir", 8.14, 8.56], ["son", 8.56, 8.80], ["agence,", 8.80, 9.36]],
    [["qui", 9.56, 9.62], ["est", 9.62, 9.80], ["la", 9.80, 9.94], ["toute", 9.94, 10.08], ["première", 10.08, 10.44]],
    [["à", 10.44, 10.68], ["nous", 10.68, 10.82], ["rejoindre", 10.82, 11.30], ["sous", 11.30, 11.56], ["la", 11.56, 11.70], ["licence", 11.70, 11.94]],
    [["du", 11.94, 12.12], ["Groupe", 12.12, 12.32], ["National", 12.32, 12.64], ["Immobilier.", 12.64, 13.04]],
  ],
  miramas: [
    [["Nous", 18.26, 18.30], ["sommes", 18.30, 18.50], ["une", 18.50, 18.68], ["agence", 18.68, 19.00]],
    [["localement", 19.70, 20.34], ["basée", 20.34, 20.90], ["sur", 20.90, 21.08], ["Miramas", 21.08, 21.38]],
    [["depuis", 21.38, 21.60], ["15", 21.60, 21.82], ["ans", 21.82, 21.96], ["maintenant.", 21.96, 22.32]],
  ],
  services: [
    [["Et", 22.92, 23.06], ["nous", 23.06, 23.34], ["continuons", 23.34, 24.14], ["à", 24.14, 24.48], ["accompagner", 24.48, 24.92]],
    [["avec", 24.92, 25.28], ["un", 25.28, 25.52], ["interlocuteur", 25.52, 26.04], ["unique", 26.04, 26.42]],
    [["sur", 26.42, 26.64], ["la", 26.64, 26.78], ["gestion", 26.78, 27.00], ["de", 27.00, 27.18], ["patrimoine,", 27.18, 27.62]],
    [["y", 27.62, 27.82], ["compris", 27.82, 28.08], ["immobilière,", 28.08, 29.08]],
    [["nos", 29.70, 29.85], ["clients.", 29.85, 30.02]],
  ],
  cap: [
    [["Et", 30.64, 30.86], ["nous", 30.86, 31.02], ["passons", 31.02, 31.78], ["le", 31.78, 32.06], ["cap", 32.06, 32.22]],
    [["de", 32.22, 32.56], ["rejoindre", 32.56, 32.98], ["le", 32.98, 33.20], ["Groupe", 33.20, 33.46], ["National", 33.46, 33.86], ["Immobilier", 33.86, 34.52]],
    [["sous", 34.52, 34.74], ["licence", 34.74, 35.18], ["aujourd’hui,", 35.18, 36.20]],
    [["sous", 36.42, 36.42], ["la", 36.42, 36.56], ["nouvelle", 36.56, 36.78], ["marque.", 36.78, 37.08]],
  ],
  fierte: [
    [["Une", 4.00, 4.38], ["véritable", 4.38, 4.86], ["fierté", 4.86, 5.28]],
    [["d’être", 5.28, 5.56], ["la", 5.56, 5.84], ["première", 5.84, 6.08], ["agence", 6.08, 6.46]],
    [["à", 6.46, 6.66], ["passer", 6.66, 6.98], ["sous", 6.98, 7.30], ["le", 7.30, 7.72], ["logo", 7.72, 7.98]],
    [["Groupe", 7.98, 8.34], ["National", 8.34, 8.80], ["Immobilier,", 8.80, 9.44]],
  ],
  independant: [
    [["la", 10.72, 10.88], ["fierté", 10.88, 11.30], ["d’être", 11.30, 12.26]],
    [["indépendant", 12.26, 13.24], ["tout", 13.24, 13.46], ["en", 13.46, 13.62]],
    [["rejoignant", 13.62, 14.38], ["un", 14.38, 14.98], ["réseau", 14.98, 15.68]],
    [["national", 15.68, 16.12], ["sous", 16.12, 16.68], ["licence", 16.68, 16.94], ["de", 16.94, 17.14], ["marque.", 17.14, 17.46]],
  ],
  merci: [
    [["Merci,", 23.36, 23.70], ["à", 23.72, 23.92], ["bientôt.", 23.92, 24.22]],
  ],
};
