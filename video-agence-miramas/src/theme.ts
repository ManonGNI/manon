import { staticFile } from "remotion";

// Charte GNI : marine dominant, or en accent rare, blanc
export const C = { marine: "#2B4258", or: "#D9AE57", blanc: "#FFFFFF" };
export const FONT = "Montserrat, 'Helvetica Neue', Arial, sans-serif";

export const MEDIA = {
  intro: staticFile("clips/intro-nans.mp4"),
  facade: staticFile("clips/facade.mp4"),
  enseigne: staticFile("clips/enseigne.mp4"),
  plaque: staticFile("clips/plaque.mp4"),
  interview: staticFile("clips/interview.mp4"),
  conclusion: staticFile("clips/conclusion.mp4"),
  musique: staticFile("medias/musique.m4a"),
  logoBlanc: staticFile("medias/logo-gni-blanc.png"),
};

export const PERSONNES = {
  nans: { nom: "Nans Bellanger", role: "Responsable développement", structure: "Groupe National Immobilier" },
  stephan: { nom: "Stephan Garcin", role: "Co-gérant", structure: "Agence SG Conseil & Patrimoine" },
};

// Sous-titres : [début s, fin s, texte] en temps du fichier source ; *mot* = mot en or
export type Caption = [number, number, string];

export const SOUS_TITRES: Record<string, Caption[]> = {
  intro: [
    [0.0, 1.82, "Nous sommes aujourd'hui à Miramas"],
    [1.82, 4.06, "pour rencontrer Stephan,"],
    [4.42, 5.62, "directeur associé de l'agence"],
    [5.62, 6.96, "SG Conseil & Patrimoine,"],
    [7.52, 9.36, "qui va nous faire découvrir son agence,"],
    [9.56, 10.68, "qui est la toute *première*"],
    [10.68, 11.94, "à nous rejoindre sous la licence"],
    [11.94, 13.1, "du Groupe National Immobilier."],
  ],
  miramas: [
    [18.26, 19.7, "Nous sommes une agence"],
    [19.7, 21.38, "localement basée sur Miramas"],
    [21.38, 22.3, "depuis *15 ans* maintenant."],
  ],
  cap: [
    [30.64, 32.22, "Et nous passons le cap"],
    [32.22, 34.52, "de rejoindre le Groupe National Immobilier"],
    [34.52, 36.2, "sous licence aujourd'hui,"],
    [36.42, 37.15, "sous la nouvelle marque."],
  ],
  fierte: [
    [4.0, 5.28, "Une véritable *fierté*"],
    [5.28, 6.66, "d'être la première agence"],
    [6.66, 7.98, "à passer sous le logo"],
    [7.98, 9.5, "Groupe National Immobilier,"],
  ],
  independant: [
    [10.72, 12.26, "la fierté d'être"],
    [12.26, 13.62, "*indépendant* tout en"],
    [13.62, 15.68, "rejoignant un réseau"],
    [15.68, 17.55, "national sous licence de marque."],
  ],
  merci: [[23.36, 24.6, "Merci, à bientôt."]],
};
