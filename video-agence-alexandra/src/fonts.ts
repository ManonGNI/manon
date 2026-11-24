import { continueRender, delayRender, staticFile } from "remotion";

// Montserrat (charte GNI) + Inter Light/Regular (proche de l'Helvetica Neue Light de l'enseigne), + Allison (manuscrite), servies en local
const FONTS: [string, string, string, string?][] = [
  ["Montserrat", "500", "fonts/montserrat-latin-500-normal.woff2"],
  ["Montserrat", "700", "fonts/montserrat-latin-700-normal.woff2"],
  ["Montserrat", "800", "fonts/montserrat-latin-800-normal.woff2"],
  ["Inter", "300", "fonts/inter-latin-300-normal.woff2"],
  ["Inter", "400", "fonts/inter-latin-400-normal.woff2"],
  ["Allison", "400", "fonts/allison-latin-400-normal.woff2"],
  ["Montserrat", "500", "fonts/montserrat-latin-500-italic.woff2", "italic"],
];

const handle = delayRender("Chargement des polices");
Promise.all(FONTS.map(([family, weight, file, style = "normal"]) => new FontFace(family, `url(${staticFile(file)})`, { weight, style }).load()))
  .then((faces) => {
    faces.forEach((f) => document.fonts.add(f));
    continueRender(handle);
  })
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
