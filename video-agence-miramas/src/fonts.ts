import { continueRender, delayRender, staticFile } from "remotion";

// Montserrat (charte GNI) servie en local
const FONTS: [string, string][] = [
  ["500", "fonts/montserrat-latin-500-normal.woff2"],
  ["700", "fonts/montserrat-latin-700-normal.woff2"],
  ["800", "fonts/montserrat-latin-800-normal.woff2"],
];

const handle = delayRender("Chargement des polices");
Promise.all(FONTS.map(([weight, file]) => new FontFace("Montserrat", `url(${staticFile(file)})`, { weight }).load()))
  .then((faces) => {
    faces.forEach((f) => document.fonts.add(f));
    continueRender(handle);
  })
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });
