import { continueRender, delayRender, staticFile } from "remotion";

// Police neutre servie en local (le teasing ne dévoile pas la typographie de la nouvelle charte)
const FONTS: [string, string, string][] = [
  ["Inter", "500", "fonts/inter-latin-500-normal.woff2"],
  ["Inter", "700", "fonts/inter-latin-700-normal.woff2"],
  ["Inter", "800", "fonts/inter-latin-800-normal.woff2"],
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
