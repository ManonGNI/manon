import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MEDIA, Mot } from "./theme";

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
// sur-titre or en capitales espacées, nom blanc sur bloc marine avec filet or vertical, cartouche blanc pour la fonction
export const LowerThird: React.FC<{ nom: string; role: string; structure: string; surtitre: string; duration: number }> = ({
  nom,
  role,
  structure,
  surtitre,
  duration,
}) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const rule = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: ease });
  const name = interpolate(frame, [4, 18], [0, 1], { ...clamp, easing: ease });
  const card = interpolate(frame, [12, 26], [0, 1], { ...clamp, easing: ease });
  const kicker = interpolate(frame, [8, 22], [0, 1], { ...clamp, easing: ease });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out, fontFamily: FONT }}>
      <div style={{ position: "absolute", left: 76, top: 990 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 25,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: C.or,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 0, 0, 0.55)",
            marginBottom: 18,
            marginLeft: 6,
            opacity: kicker,
            transform: `translateY(${(1 - kicker) * 10}px)`,
          }}
        >
          {surtitre}
        </div>
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

// Logo blanc officiel en signature, en haut à gauche
export const LogoSignature: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <Img src={MEDIA.logoBlanc} style={{ position: "absolute", left: 64, top: 110, width: 230, opacity: o * 0.95 }} />;
};

// Titre de l'agence sur le plan de façade
export const TitreAgence: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [4, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const sub = interpolate(frame, [14, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const out = interpolate(frame, [duration - 8, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 330,
          background: C.marine,
          padding: "34px 64px 38px 72px",
          clipPath: `inset(0 ${(1 - inP) * 100}% 0 0)`,
          fontFamily: FONT,
          color: C.blanc,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 82, lineHeight: 1.0, letterSpacing: -1.5 }}>Agence SG</div>
        <div style={{ fontWeight: 800, fontSize: 58, lineHeight: 1.1, letterSpacing: -0.8 }}>Conseil & Patrimoine</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 18,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 10}px)`,
          }}
        >
          <div style={{ width: 56, height: 9, borderRadius: 5, background: C.or }} />
          <div style={{ fontWeight: 500, fontSize: 36 }}>Miramas</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Écran de fin marine
export const EcranFin: React.FC = () => {
  const frame = useCurrentFrame();
  const bg = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rise = (d: number) => {
    const p = interpolate(frame, [d, d + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
    return { opacity: p, transform: `translateY(${(1 - p) * 30}px)` };
  };
  return (
    <AbsoluteFill style={{ background: C.marine, opacity: bg, fontFamily: FONT, color: C.blanc }}>
      <Img src={MEDIA.logoBlanc} style={{ position: "absolute", left: 96, top: 470, width: 600, ...rise(6) }} />
      <div style={{ position: "absolute", left: 96, top: 1010, right: 96 }}>
        <div style={{ fontWeight: 500, fontSize: 40, marginBottom: 14, ...rise(18) }}>Bienvenue à l'agence</div>
        <div style={{ fontWeight: 800, fontSize: 80, lineHeight: 1.02, letterSpacing: -1.5, ...rise(24) }}>
          SG Conseil
          <br />& Patrimoine
        </div>
        <div style={{ fontWeight: 700, fontSize: 40, color: C.or, marginTop: 26, ...rise(30) }}>Miramas</div>
        <div style={{ fontWeight: 500, fontSize: 30, marginTop: 70, opacity: 0.8, ...rise(38) }}>
          Première agence sous licence de marque
          <br />
          Groupe National Immobilier
        </div>
      </div>
    </AbsoluteFill>
  );
};
