import { continueRender, delayRender, staticFile } from "remotion";

// Polices de la charte servies en local : Montserrat (marque) et Allison (phrase signature)
const FONTS: [string, string, string][] = [
  ["Montserrat", "500", "fonts/montserrat-latin-500-normal.woff2"],
  ["Montserrat", "700", "fonts/montserrat-latin-700-normal.woff2"],
  ["Montserrat", "800", "fonts/montserrat-latin-800-normal.woff2"],
  ["Allison", "400", "fonts/allison-latin-400-normal.woff2"],
];

const handle = delayRender("Chargement des polices");
Promise.all(
  FONTS.map(([family, weight, file]) => new FontFace(family, `url(${staticFile(file)})`, { weight }).load()),
)
  .then((faces) => {
    faces.forEach((f) => document.fonts.add(f));
    continueRender(handle);
  })
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
