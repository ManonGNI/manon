import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MEDIA, Mot } from "./theme";
import { SIGLE } from "./sigle";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

// Sous-titres synchronisés : texte blanc épais, surlignage or qui passe sous le mot prononcé.
// `offset` = temps (s) du fichier source au début de la séquence
export const Captions: React.FC<{ items: Mot[][]; offset: number }> = ({ items, offset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = offset + frame / fps;
  const idx = items.findIndex((line, i) => {
    const next = items[i + 1];
    const lastEnd = line[line.length - 1][2];
    const end = next && next[0][1] - lastEnd < 0.6 ? next[0][1] : lastEnd + 0.3;
    return t >= line[0][1] - 0.05 && t < end;
  });
  if (idx < 0) return null;
  const line = items[idx];
  const appear = interpolate((t - line[0][1]) * fps, [-1.5, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  // mot actif = dernier mot commencé ; le surlignage reste sur le dernier mot jusqu'à la ligne suivante
  let active = -1;
  line.forEach(([, s], i) => {
    if (t >= s - 0.03) active = i;
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 460 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 940,
          rowGap: 6,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          color: C.blanc,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.55), 0 0 2px rgba(0, 0, 0, 0.35)",
          opacity: appear,
          transform: `translateY(${(1 - appear) * 12}px)`,
        }}
      >
        {line.map(([mot, s], i) => {
          const on = i === active;
          const p = on
            ? interpolate((t - s) * fps, [-1, 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })
            : 0;
          return (
            <span key={i} style={{ position: "relative", padding: "2px 12px 6px", margin: "0 1px" }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: C.or,
                  borderRadius: 8,
                  transform: `scaleX(${p})`,
                  transformOrigin: "left center",
                  opacity: on ? 1 : 0,
                }}
              />
              <span style={{ position: "relative" }}>{mot}</span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Bandeau nom / fonction, style « Journal de l'Agence » :
// nom blanc sur bloc marine avec filet or vertical, cartouche blanc pour la fonction
export const LowerThird: React.FC<{ nom: string; role: string; structure: string; duration: number }> = ({
  nom,
  role,
  structure,
  duration,
}) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const rule = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: ease });
  const name = interpolate(frame, [4, 18], [0, 1], { ...clamp, easing: ease });
  const card = interpolate(frame, [12, 26], [0, 1], { ...clamp, easing: ease });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out, fontFamily: FONT }}>
      <div style={{ position: "absolute", left: 76, top: 1030 }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: 7, background: C.or, transform: `scaleY(${rule})`, transformOrigin: "top" }} />
          <div
            style={{
              background: C.marine,
              color: C.blanc,
              fontWeight: 700,
              fontSize: 60,
              letterSpacing: -0.5,
              padding: "12px 44px 16px 20px",
              clipPath: `inset(0 ${(1 - name) * 100}% 0 0)`,
            }}
          >
            {nom}
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            marginLeft: 13,
            background: C.blanc,
            color: C.marine,
            fontWeight: 500,
            fontSize: 33,
            lineHeight: 1.45,
            padding: "10px 40px 12px 16px",
            clipPath: `inset(0 ${(1 - card) * 100}% 0 0)`,
          }}
        >
          {role}
          <br />
          {structure}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Logo officiel en signature : blanc en haut à gauche (extérieur), bleu en haut à droite (intérieur, mur clair)
export const LogoSignature: React.FC<{ duration: number; variante?: "blanc" | "bleu" }> = ({ duration, variante = "blanc" }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return variante === "blanc" ? (
    <Img src={MEDIA.logoBlanc} style={{ position: "absolute", left: 64, top: 110, width: 230, opacity: o * 0.95 }} />
  ) : (
    <Img src={MEDIA.logoBleu} style={{ position: "absolute", right: 60, top: 110, width: 230, opacity: o }} />
  );
};

// Écran de fin marine, reprenant la disposition de la carte agence GNI
const FONT_ENSEIGNE = "Inter, 'Helvetica Neue', Arial, sans-serif";

export const EcranFin: React.FC<{ nom: string[]; villes: string[]; tailleNom?: number }> = ({ nom, villes, tailleNom = 82 }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const bg = interpolate(frame, [0, 10], [0, 1], clamp);
  const prog = (d: number, len = 16) => interpolate(frame, [d, d + len], [0, 1], { ...clamp, easing: ease });
  // ligne qui monte derrière un masque
  const maskRise = (d: number): React.CSSProperties => ({ transform: `translateY(${(1 - prog(d, 18)) * 110}%)` });

  // Sigle : arrive en grand puis se pose ; la barre or glisse depuis la droite
  const gIn = prog(2, 34);
  const barIn = prog(14, 26);
  // « Bienvenue à l'agence » : écrit de gauche à droite
  const ecrit = interpolate(frame, [10, 42], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  // reflet doré qui balaie le texte manuscrit une fois écrit
  const reflet = interpolate(frame, [48, 78], [-30, 130], clamp);

  return (
    <AbsoluteFill style={{ background: C.marine, opacity: bg, color: C.blanc, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
        width={1000}
        height={(1000 * SIGLE.h) / SIGLE.w}
        style={{
          position: "absolute",
          left: 250,
          top: 560,
          opacity: gIn,
          transform: `scale(${1.35 - 0.35 * gIn}) rotate(${(1 - gIn) * -12}deg) scale(${1 + 0.03 * prog(40, 95)})`,
          transformOrigin: "50% 50%",
        }}
      >
        <path d={SIGLE.gPath} fill={C.blanc} fillOpacity={0.08} />
        <g transform={`translate(${(1 - barIn) * 90} 0)`} opacity={barIn}>
          <path d={SIGLE.barPath} fill={C.or} fillOpacity={0.4} />
        </g>
      </svg>

      <div style={{ position: "absolute", left: 104, top: 540, right: 40 }}>
        <div
          style={{
            fontFamily: "Allison, cursive",
            fontSize: 118,
            lineHeight: 1,
            color: C.or,
            marginLeft: -6,
            marginBottom: 6,
            clipPath: `inset(-20% ${(1 - ecrit) * 100}% -20% -5%)`,
            backgroundImage: `linear-gradient(100deg, ${C.or} ${reflet - 12}%, #F6E2B3 ${reflet}%, ${C.or} ${reflet + 12}%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Bienvenue à l'agence
        </div>
        <div style={{ fontFamily: FONT_ENSEIGNE, fontWeight: 300, fontSize: tailleNom, lineHeight: 1.12, letterSpacing: -1.5 }}>
          {nom.map((ligne, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <div style={maskRise(26 + i * 5)}>{ligne}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          {villes.map((ville, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <div style={{ fontFamily: FONT_ENSEIGNE, fontWeight: 400, fontSize: 44, lineHeight: 1.25, color: C.or, ...maskRise(36 + i * 4) }}>
                {ville}
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "relative", marginTop: 90, width: 540 }}>
          <Img
            src={MEDIA.logoBlanc}
            style={{
              display: "block",
              width: 540,
              opacity: prog(48),
              transform: `translateX(${(1 - prog(48, 20)) * -40}px)`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
