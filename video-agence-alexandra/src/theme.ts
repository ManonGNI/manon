import { staticFile } from "remotion";

// Charte GNI : marine dominant, or en accent rare, blanc
export const C = { marine: "#2B4258", or: "#D9AE57", blanc: "#FFFFFF" };
export const FONT = "Montserrat, 'Helvetica Neue', Arial, sans-serif";

// Passages découpés dans les rushs (fichier source, début en s) :
// intro-loic = 20261119_105523 à 7,60 s, recadré sur Loïc (crop 720 × 1280 à 158,560) et éclairci ; les autres = 20261119_113537 (interview) à l'instant indiqué
export const MEDIA = {
  intro: staticFile("clips/intro-loic.mp4"), // 7.60
  introCourt: staticFile("clips/intro-loic-court.mp4"), // 10.04 (sans « Aujourd'hui, je me situe… »), recadré, éclairci, dominante bleue corrigée
  debutLong: staticFile("clips/debut-long.mp4"), // 48.70 → 57.50 (« …16 ans négociatrice en immobilier VRP »)
  debut: staticFile("clips/debut.mp4"), // 48.70
  conseil: staticFile("clips/conseil.mp4"), // 136.05
  proximite: staticFile("clips/proximite.mp4"), // 257.62
  humain: staticFile("clips/humain.mp4"), // 263.22
  isolee: staticFile("clips/isolee.mp4"), // 291.40 (0,4 s d'amorce pour le fondu)
  accompagne: staticFile("clips/accompagne.mp4"), // 385.10 (0,4 s d'amorce pour le fondu)
  avantgarde: staticFile("clips/avantgarde.mp4"), // 389.50
  merci: staticFile("clips/merci.mp4"), // 412.40
  technologie: staticFile("clips/technologie.mp4"), // 150.28
  google: staticFile("clips/google.mp4"), // 160.60 (0,4 s d'amorce pour le fondu)
  journee: staticFile("clips/journee.mp4"), // 179.35
  service: staticFile("clips/service.mp4"), // 89.45
  ecouter: staticFile("clips/ecouter.mp4"), // 122.55 (0,4 s d'amorce pour le fondu)
  questionDebut: staticFile("clips/question-debut.mp4"), // 43.40 (Loïc)
  questionVibrer: staticFile("clips/question-vibrer.mp4"), // 46.58 (Loïc)
  questionGroupement: staticFile("clips/question-groupement.mp4"), // 249.15 (Loïc)
  loicConclusion: staticFile("clips/loic-conclusion.mp4"), // 403.15 (Loïc)
  merciFinal: staticFile("clips/merci-final.mp4"), // 411.40
  // témoignage
  ouvertureRires: staticFile("clips/ouverture-rires.mp4"), // 8.30 → 11.50 : Alexandra et Loïc rient (avant l'interview)
  proximiteSuite: staticFile("clips/proximite-suite.mp4"), // 257.62 → 265.95, d'un seul tenant
  communaute: staticFile("clips/communaute.mp4"), // 299.10 → 311.45, d'un seul tenant
  arretFin: staticFile("medias/arret-fin-temoignage.jpg"), // image figée à 403,14 s (fin de « nos agences »)
  accompagneFin: staticFile("clips/accompagne-fin.mp4"), // 385.50 → 404.00, d'un seul tenant (son coupé après « nos agences »)
  valeurs: staticFile("clips/valeurs.mp4"), // 272.00 (0,4 s d'amorce pour le fondu)
  communaute1: staticFile("clips/communaute1.mp4"), // 299.10
  communaute2: staticFile("clips/communaute2.mp4"), // 307.45
  logoBlanc: staticFile("medias/logo-gni-blanc.png"),
  logoBleu: staticFile("medias/logo-gni-bleu.png"),
  fondAlexandra: staticFile("medias/fond-alexandra.jpg"), // photo d'Alexandra (interview, 126,5 s) pour l'écran de fin « photo »
  ouvertureDevanture: staticFile("clips/ouverture-devanture.mp4"), // devanture vide (rush de Loïc à 1,5 s) + passant réel incrusté (rush 3,9 → 5,1 s, ralenti ×1,45), sans Loïc ni son — voir scripts/incrust-passant.py
  ouvertureAccueil: staticFile("clips/ouverture-accueil.mp4"), // 35.40 → 39.60 : « Merci Alexandra de nous recevoir » / « Merci à vous Loïc »
  facadePlein: staticFile("medias/facade-plein.jpg"), // façade plein cadre (ouverture vidéo 1)
  facadeAlexandra: staticFile("medias/facade-alexandra.jpg"), // façade de l'agence (rush de Loïc, avant son entrée)
  logoAlexandraBlanc: staticFile("medias/logo-alexandra-blanc.png"), // logo officiel de l'agence passé en blanc (écran de fin)
  logoAlexandra: staticFile("medias/logo-alexandra-transparent.png"), // logo officiel de l'agence, recadré, fond crème rendu transparent, 1082 × 785
};

// Bandeaux nom de la rubrique « Portrait d'agence »
export const BANDEAUX = {
  loic: { prenom: "Loïc", nom: "Fauchet", structure: "Conseiller · Groupe National Immobilier" },
  alexandra: { prenom: "Alexandra", nom: "Gameiro", structure: "Dirigeante · Alexandra l’Immobilier" },
};

// Bandeaux « signature » (nom + fonction) — version précédente
export const SIGNATURES = {
  loic: { nom: "Loïc Fauchet", fonction: "Conseiller au Groupe National Immobilier", monogramme: "gni" as const, fondCarre: "#2B4258" },
  alexandra: {
    nom: "Alexandra Gameiro",
    fonction: "Dirigeante d’Alexandra l’Immobilier en Provence",
    monogramme: staticFile("medias/monogramme-alexandra.png"),
    fondCarre: "#F7F3EA",
  },
};

export const PERSONNES = {
  loic: { nom: "Loïc Fauchet", role: "Commercial Vaucluse & Bouches-du-Rhône", structure: "Groupe National Immobilier" },
  alexandra: { nom: "Alexandra Gameiro", role: "Dirigeante", structure: "Alexandra l’Immobilier en Provence" },
};

// Écran de fin du témoignage
export const GROUPEMENT = {
  accroche: "Rejoignez notre Groupe",
  lignes: ["Agences immobilières", "indépendantes"],
  site: "groupenationalimmobilier.fr",
};

export const AGENCE = {
  nom: ["Alexandra", "l’Immobilier en Provence"],
  villes: ["Pernes-les-Fontaines", "Beaumes-de-Venise"],
};

// Sous-titres mot à mot : [mot, début s, fin s] en temps du fichier source.
// Chaque ligne = un groupe de mots affiché ensemble ; le surlignage or suit le mot prononcé.
export type Mot = [string, number, number];

export const SOUS_TITRES: Record<string, Mot[][]> = {
  intro: [
    [["Aujourd’hui,", 7.74, 7.98]],
    [["je", 8.06, 8.12], ["me", 8.12, 8.30], ["situe", 8.30, 8.54], ["sur", 8.54, 8.72], ["la", 8.72, 8.88], ["commune", 8.88, 9.14]],
    [["de", 9.14, 9.38], ["Pernes-les-Fontaines", 9.38, 9.96]],
    [["où", 9.96, 10.08], ["je", 10.08, 10.24], ["vais", 10.24, 10.32], ["vous", 10.32, 10.52], ["présenter", 10.52, 11.14]],
    [["une", 11.14, 11.60], ["nouvelle", 11.60, 11.84], ["agence", 11.84, 12.16], ["qui", 12.16, 12.38]],
    [["vient", 12.38, 12.52], ["de", 12.52, 12.72], ["rejoindre", 12.72, 13.14], ["le", 13.14, 13.38], ["Groupe", 13.38, 13.58]],
    [["National", 13.58, 13.94], ["Immobilier,", 13.94, 14.64]],
    [["l’agence", 15.14, 15.50], ["Alexandra", 15.50, 16.06], ["l’Immobilier", 16.06, 16.62]],
    [["en", 16.62, 16.84], ["Provence.", 16.84, 17.56]],
    [["Elle", 17.76, 17.94], ["est", 17.94, 18.18], ["constituée", 18.18, 18.54], ["de", 18.54, 18.86], ["deux", 18.86, 19.06]],
    [["agences,", 19.06, 19.44], ["une", 19.64, 19.74], ["agence", 19.74, 20.04], ["sur", 20.04, 20.24]],
    [["Pernes-les-Fontaines", 20.24, 21.02], ["et", 21.02, 21.28]],
    [["une", 21.28, 21.40], ["agence", 21.40, 21.60], ["sur", 21.60, 21.90], ["Beaumes-de-Venise.", 21.90, 22.60]],
  ],
  debut: [
    [["Alors", 48.77, 48.93], ["j’ai", 48.93, 49.13], ["commencé", 49.13, 49.39], ["l’immobilier", 49.39, 49.99]],
    [["il", 49.99, 50.13], ["y", 50.13, 50.13], ["a", 50.13, 50.19], ["25", 50.19, 50.47], ["ans", 50.47, 51.20]],
  ],
  conseil: [
    [["Il", 136.13, 136.23], ["faut", 136.23, 136.35], ["connaître", 136.35, 136.65], ["aussi", 136.65, 136.93]],
    [["bien", 136.93, 137.23], ["le", 137.23, 137.79], ["projet", 137.79, 138.21], ["de", 138.21, 138.45], ["la", 138.45, 138.61], ["personne", 138.61, 139.07]],
    [["que", 139.07, 139.63], ["la", 139.63, 139.83], ["personne", 139.83, 140.05], ["qu’on", 140.05, 140.29], ["a", 140.29, 140.37]],
    [["en", 140.37, 140.65], ["face", 140.65, 140.85], ["de", 140.85, 141.11], ["soi", 141.11, 141.41], ["pour", 141.41, 141.99], ["pouvoir", 141.99, 142.17]],
    [["la", 142.17, 142.45], ["conseiller", 142.45, 142.83], ["au", 142.83, 143.09], ["mieux", 143.09, 143.35]],
  ],
  proximite: [
    [["La", 257.71, 258.05], ["proximité,", 258.05, 258.97]],
  ],
  humain: [
    [["J’aime", 263.31, 263.45], ["bien", 263.45, 263.55], ["avoir", 263.55, 263.75], ["le", 263.75, 263.93], ["contact", 263.93, 264.17]],
    [["humain", 264.17, 264.39], ["et", 264.39, 264.53], ["pour", 264.53, 264.65], ["moi,", 264.65, 264.87]],
    [["c’est", 265.17, 265.19], ["important.", 265.19, 265.83]],
  ],
  isolee: [
    [["Et", 291.87, 292.27], ["je", 292.27, 292.61], ["suis", 292.61, 292.65], ["persuadée", 292.65, 292.99], ["qu’une", 292.99, 293.27]],
    [["agence", 293.27, 293.77], ["isolée,", 293.77, 294.35]],
    [["seule", 294.53, 294.53], ["dans", 294.53, 294.73], ["son", 294.73, 294.93], ["coin,", 294.93, 295.23]],
    [["ce", 295.95, 296.03], ["n’est", 296.03, 296.03], ["plus", 296.03, 296.19], ["d’actualité", 296.19, 296.73]],
    [["aujourd’hui.", 296.73, 297.99]],
  ],
  isoleeAccroche: [
    [["Je", 292.27, 292.61], ["suis", 292.61, 292.65], ["persuadée", 292.65, 292.99], ["qu’une", 292.99, 293.27]],
    [["agence", 293.27, 293.77], ["isolée,", 293.77, 294.35]],
    [["seule", 294.53, 294.53], ["dans", 294.53, 294.73], ["son", 294.73, 294.93], ["coin,", 294.93, 295.23]],
    [["ce", 295.95, 296.03], ["n’est", 296.03, 296.03], ["plus", 296.03, 296.19], ["d’actualité", 296.19, 296.73]],
    [["aujourd’hui.", 296.73, 297.99]],
  ],
  valeurs: [
    [["On", 272.47, 272.47], ["sent", 272.47, 272.61], ["vraiment", 272.61, 272.99], ["cet", 272.99, 273.17], ["élément,", 273.17, 273.73]],
    [["mes", 274.51, 274.67], ["valeurs", 274.67, 274.97], ["en", 274.97, 275.11], ["fait,", 275.11, 275.35]],
    [["l’humanité,", 275.65, 276.23], ["qui", 276.81, 277.11], ["est", 277.11, 277.25], ["là,", 277.25, 277.49]],
    [["l’écoute.", 277.81, 278.27]],
  ],
  communaute1: [
    [["On", 299.11, 299.49], ["a", 299.49, 299.59], ["un", 299.59, 299.75], ["métier", 299.75, 299.93], ["qui", 299.93, 300.17], ["a", 300.17, 300.27], ["énormément", 300.27, 300.67]],
    [["évolué,", 300.67, 301.01], ["comme", 301.09, 301.25], ["beaucoup", 301.25, 301.63], ["de", 301.63, 301.85]],
    [["métiers,", 301.85, 302.59], ["et", 302.93, 303.17], ["qu’il", 303.17, 303.39], ["vaut", 303.39, 303.51], ["mieux", 303.51, 303.77]],
    [["être", 303.77, 304.77], ["en", 304.77, 305.43], ["communauté", 305.43, 306.09]],
  ],
  communaute2: [
    [["pour", 307.53, 307.93], ["faire", 307.93, 308.11], ["nos", 308.11, 308.31], ["forces", 308.31, 308.53], ["entre", 308.53, 310.91], ["nous.", 310.91, 311.33]],
  ],
  accompagne: [
    [["Dans", 385.55, 385.69], ["le", 385.69, 385.81], ["Groupe", 385.81, 386.05], ["National", 386.05, 386.43]],
    [["Immobilier,", 386.43, 386.77]],
    [["on", 386.83, 386.87], ["se", 386.87, 387.03], ["sent", 387.03, 387.17], ["vraiment", 387.17, 387.69], ["accompagné.", 387.69, 388.15]],
  ],
  avantgarde: [
    [["Et", 389.57, 389.75], ["il", 389.75, 389.75], ["y", 389.75, 389.75], ["a", 389.75, 390.03], ["cet", 390.03, 390.29], ["esprit", 390.29, 390.65], ["aussi", 390.65, 391.43]],
    [["avant-gardiste", 391.43, 392.07], ["que", 392.07, 392.81], ["j’apprécie", 392.81, 393.45]],
    [["énormément", 393.45, 394.03]],
  ],
  merci: [
    [["Merci", 412.45, 412.73], ["à", 412.73, 412.91], ["vous", 412.91, 413.15], ["et", 413.15, 413.27], ["merci", 413.27, 413.49], ["au", 413.49, 413.67]],
    [["groupement.", 413.67, 414.07]],
    [["Merci", 414.23, 414.51], ["à", 414.51, 414.67], ["tous", 414.67, 414.73], ["les", 414.73, 414.93], ["adhérents.", 414.93, 415.31]],
  ],
  technologie: [
    [["C’est", 150.31, 150.47], ["primordial", 150.47, 151.19], ["aujourd’hui", 151.19, 151.61]],
    [["de", 151.61, 152.43], ["renforcer", 152.43, 152.93], ["encore", 152.93, 153.29], ["ce", 153.29, 153.41], ["lien-là", 153.41, 154.17]],
    [["pour", 154.17, 154.49], ["pouvoir", 154.49, 154.79], ["vraiment", 154.79, 155.21], ["se", 155.21, 155.45]],
    [["démarquer", 155.45, 156.39], ["de", 156.39, 156.83], ["l’évolution", 156.83, 157.59]],
    [["de", 157.59, 158.01], ["la", 158.01, 158.21], ["technologie,", 158.21, 159.15], ["notamment", 159.39, 159.81]],
  ],
  google: [
    [["avec", 161.07, 161.55], ["Google,", 161.55, 162.03], ["l’IA", 162.33, 162.59]],
  ],
  journee: [
    [["C’est", 179.39, 179.55], ["un", 179.55, 179.59], ["métier", 179.59, 180.03], ["où", 180.03, 180.37], ["on", 180.37, 180.59], ["sait", 180.59, 180.73]],
    [["à", 180.73, 180.89], ["quelle", 180.89, 180.97], ["heure", 180.97, 181.07], ["on", 181.07, 181.15], ["se", 181.15, 181.29], ["lève", 181.29, 181.41]],
    [["le", 181.41, 181.63], ["matin", 181.63, 181.81], ["mais", 181.81, 181.97], ["on", 181.97, 182.09], ["ne", 182.09, 182.25], ["sait", 182.25, 182.25]],
    [["pas", 182.25, 182.41], ["à", 182.41, 182.53], ["quelle", 182.53, 182.55], ["heure", 182.55, 182.69], ["on", 182.69, 182.89], ["termine", 182.89, 183.17], ["le", 183.17, 183.43], ["soir.", 183.43, 183.63]],
  ],
  service: [
    [["Le", 89.49, 89.71], ["service", 89.71, 90.03], ["et", 90.03, 90.19], ["le", 90.19, 90.43], ["conseil", 90.43, 90.81]],
    [["auprès", 90.81, 91.17], ["des", 91.17, 91.33], ["clients.", 91.33, 91.63]],
  ],
  ecouter: [
    [["Je", 123.01, 123.21], ["pense", 123.21, 123.57], ["qu’il", 123.57, 124.49], ["est", 124.49, 124.63], ["important", 124.63, 124.97]],
    [["aujourd’hui", 124.97, 125.37], ["de", 125.37, 125.57], ["savoir", 125.57, 125.81], ["écouter", 125.81, 126.45]],
    [["le", 126.45, 127.19], ["projet", 127.19, 127.45], ["du", 127.45, 127.63], ["client.", 127.63, 128.05]],
  ],
  qDebut: [
    [["Comment", 43.43, 43.79], ["vous", 43.79, 43.95], ["avez", 43.95, 44.11], ["commencé", 44.11, 44.37], ["l’immobilier ?", 44.37, 44.99]],
  ],
  qVibrer: [
    [["Qu’est-ce", 46.63, 46.77], ["qui", 46.77, 46.87], ["vous", 46.87, 47.01], ["fait", 47.01, 47.19], ["vibrer", 47.19, 47.51], ["dans", 47.51, 47.67], ["ce", 47.67, 47.81], ["métier ?", 47.81, 48.01]],
  ],
  qGroupement: [
    [["Pourquoi", 249.19, 249.37], ["avoir", 249.37, 249.67], ["rejoint", 249.67, 249.87], ["le", 249.87, 250.05], ["groupement ?", 250.05, 250.29]],
  ],
  loicConclusion: [
    [["Et", 403.17, 403.61], ["le", 403.61, 403.73], ["but,", 403.73, 403.85], ["c’est", 403.95, 404.19], ["de", 404.19, 404.41], ["travailler", 404.41, 404.57]],
    [["main", 404.57, 404.73], ["dans", 404.73, 404.91], ["la", 404.91, 405.09], ["main", 405.09, 405.21], ["et", 405.79, 406.23], ["que", 406.23, 406.37]],
    [["toutes", 406.37, 406.51], ["nos", 406.51, 406.71], ["agences", 406.71, 406.91], ["soient", 406.91, 407.11], ["heureuses.", 407.11, 407.55]],
  ],
  merciFinal: [
    [["Merci,", 411.49, 411.65], ["Alexandra.", 412.23, 412.23]],
    [["Merci", 412.45, 412.73], ["à", 412.73, 412.91], ["vous", 412.91, 413.15], ["et", 413.15, 413.27], ["merci", 413.27, 413.49], ["au", 413.49, 413.67]],
    [["groupement.", 413.67, 414.07]],
    [["Merci", 414.23, 414.51], ["à", 414.51, 414.67], ["tous", 414.67, 414.73], ["les", 414.73, 414.93], ["adhérents.", 414.93, 415.31]],
  ],
  avantgardeSuite: [
    [["Et", 389.57, 389.75], ["il", 389.75, 389.75], ["y", 389.75, 389.75], ["a", 389.75, 390.03], ["cet", 390.03, 390.29], ["esprit", 390.29, 390.65], ["aussi", 390.65, 391.43]],
    [["avant-gardiste", 391.43, 392.07], ["que", 392.07, 392.81], ["j’apprécie", 392.81, 393.45]],
    [["énormément", 393.45, 394.03], ["parce", 394.03, 394.41], ["que", 394.41, 394.53], ["nous,", 394.53, 394.71]],
    [["effectivement,", 394.99, 395.31]],
    [["on", 395.99, 396.07], ["n’y", 396.07, 396.19], ["pense", 396.19, 396.33], ["pas", 396.33, 396.51], ["toujours.", 396.51, 396.71]],
    [["On", 397.21, 397.47], ["n’a", 397.47, 397.61], ["pas", 397.61, 397.73], ["le", 397.73, 397.83], ["temps.", 397.83, 397.93]],
  ],
  loicTemps: [
    [["On", 398.07, 398.17], ["est", 398.17, 398.31], ["là", 398.31, 398.45], ["pour", 398.45, 398.65], ["ça,", 398.65, 399.01], ["et", 399.01, 399.19], ["on", 399.19, 399.39]],
    [["prend", 399.39, 399.57], ["du", 399.57, 399.75], ["temps", 399.75, 399.97], ["pour", 399.97, 400.21], ["ça", 400.21, 400.45]],
    [["et", 400.45, 400.59], ["on", 400.59, 400.73], ["prend", 400.73, 400.93], ["du", 400.93, 401.07], ["temps", 401.07, 401.25]],
    [["pour", 401.25, 401.65], ["accompagner", 401.65, 402.19], ["nos", 402.19, 402.43], ["agences.", 402.43, 403.15]],
  ],
  proximiteSuite: [
    [["La", 257.71, 258.05], ["proximité,", 258.05, 258.97]],
    [["parce", 259.41, 259.57], ["que", 259.57, 259.65], ["c’est", 259.65, 259.75], ["vrai", 259.75, 259.79], ["que", 259.79, 259.93]],
    [["vous", 259.93, 260.01], ["n’êtes", 260.01, 260.29], ["pas", 260.29, 260.49], ["loin", 260.49, 260.71], ["géographiquement.", 260.71, 261.53]],
    [["Donc,", 262.07, 262.55], ["c’est", 262.55, 262.81], ["rassurant.", 262.81, 263.17]],
    [["J’aime", 263.31, 263.45], ["bien", 263.45, 263.55], ["avoir", 263.55, 263.75], ["le", 263.75, 263.93], ["contact", 263.93, 264.17]],
    [["humain", 264.17, 264.39], ["et", 264.39, 264.53], ["pour", 264.53, 264.65], ["moi,", 264.65, 264.87]],
    [["c’est", 265.17, 265.19], ["important.", 265.19, 265.83]],
  ],
  communaute: [
    [["On", 299.11, 299.49], ["a", 299.49, 299.59], ["un", 299.59, 299.75], ["métier", 299.75, 299.93], ["qui", 299.93, 300.17], ["a", 300.17, 300.27], ["énormément", 300.27, 300.67]],
    [["évolué,", 300.67, 301.01], ["comme", 301.09, 301.25], ["beaucoup", 301.25, 301.63]],
    [["de", 301.63, 301.85], ["métiers,", 301.85, 302.59], ["et", 302.93, 303.17], ["qu’il", 303.17, 303.39], ["vaut", 303.39, 303.51], ["mieux", 303.51, 303.77]],
    [["être", 303.77, 304.77], ["en", 304.77, 305.43], ["communauté", 305.43, 306.09], ["pour", 307.53, 307.93]],
    [["faire", 307.93, 308.11], ["nos", 308.11, 308.31], ["forces", 308.31, 308.53], ["entre", 308.53, 310.91], ["nous.", 310.91, 311.33]],
  ],
  accompagneSuite: [
    [["Dans", 385.55, 385.69], ["le", 385.69, 385.81], ["Groupe", 385.81, 386.05], ["National", 386.05, 386.43]],
    [["Immobilier,", 386.43, 386.77]],
    [["on", 386.83, 386.87], ["se", 386.87, 387.03], ["sent", 387.03, 387.17], ["vraiment", 387.17, 387.69], ["accompagné.", 387.69, 388.17]],
    [["C’est", 388.17, 388.31], ["gentil.", 388.31, 388.77]],
    [["Et", 389.57, 389.75], ["il", 389.75, 389.75], ["y", 389.75, 389.75], ["a", 389.75, 390.03], ["cet", 390.03, 390.29], ["esprit", 390.29, 390.65], ["aussi", 390.65, 391.43]],
    [["avant-gardiste", 391.43, 392.07], ["que", 392.07, 392.81], ["j’apprécie", 392.81, 393.45]],
    [["énormément", 393.45, 394.03], ["parce", 394.03, 394.41], ["que", 394.41, 394.53], ["nous,", 394.53, 394.71]],
    [["effectivement,", 394.99, 395.31]],
    [["on", 395.99, 396.07], ["n’y", 396.07, 396.19], ["pense", 396.19, 396.33], ["pas", 396.33, 396.51], ["toujours.", 396.51, 396.71]],
    [["On", 397.21, 397.47], ["n’a", 397.47, 397.61], ["pas", 397.61, 397.73], ["le", 397.73, 397.83], ["temps.", 397.83, 397.93]],
  ],
  introCourt: [
    [["Je", 10.08, 10.24], ["vais", 10.24, 10.32], ["vous", 10.32, 10.52], ["présenter", 10.52, 11.14], ["une", 11.14, 11.60]],
    [["nouvelle", 11.60, 11.84], ["agence", 11.84, 12.16], ["qui", 12.16, 12.38], ["vient", 12.38, 12.52]],
    [["de", 12.52, 12.72], ["rejoindre", 12.72, 13.14], ["le", 13.14, 13.38], ["Groupe", 13.38, 13.58], ["National", 13.58, 13.94]],
    [["Immobilier,", 13.94, 14.64]],
    [["l’agence", 15.14, 15.50], ["Alexandra", 15.50, 16.06], ["l’Immobilier", 16.06, 16.62]],
    [["en", 16.62, 16.84], ["Provence.", 16.84, 17.56]],
    [["Elle", 17.76, 17.94], ["est", 17.94, 18.18], ["constituée", 18.18, 18.54], ["de", 18.54, 18.86], ["deux", 18.86, 19.06]],
    [["agences,", 19.06, 19.44], ["une", 19.64, 19.74], ["agence", 19.74, 20.04], ["sur", 20.04, 20.24]],
    [["Pernes-les-Fontaines", 20.24, 21.02], ["et", 21.02, 21.28]],
    [["une", 21.28, 21.40], ["agence", 21.40, 21.60], ["sur", 21.60, 21.90], ["Beaumes-de-Venise.", 21.90, 22.60]],
  ],
  debutLong: [
    [["Alors", 48.77, 48.93], ["j’ai", 48.93, 49.13], ["commencé", 49.13, 49.39], ["l’immobilier", 49.39, 49.99]],
    [["il", 49.99, 50.13], ["y", 50.13, 50.13], ["a", 50.13, 50.19], ["25", 50.19, 50.47], ["ans,", 50.47, 51.65], ["donc", 51.65, 52.97]],
    [["en", 52.97, 53.51], ["étant", 53.51, 53.89], ["16", 53.89, 54.19], ["ans", 54.19, 54.37], ["négociatrice", 54.37, 55.05]],
    [["en", 55.05, 55.23], ["immobilier", 55.23, 56.41], ["VRP.", 56.41, 57.50]],
  ],
};
