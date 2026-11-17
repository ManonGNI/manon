import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, Caption, FONT, MEDIA } from "./theme";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

// Texte avec *mot* en or
const Rich: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*[^*]+\*)/).map((part, i) =>
      part.startsWith("*") ? (
        <span key={i} style={{ color: C.or }}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </>
);

// Sous-titres synchronisés : `offset` = temps (s) du fichier source au début de la séquence
export const Captions: React.FC<{ items: Caption[]; offset: number }> = ({ items, offset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = offset + frame / fps;
  const idx = items.findIndex(([s, e], i) => {
    const next = items[i + 1];
    const end = next && next[0] - e < 0.6 ? next[0] : e + 0.25;
    return t >= s && t < end;
  });
  if (idx < 0) return null;
  const [start, , text] = items[idx];
  const local = (t - start) * fps;
  const appear = interpolate(local, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 470 }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 50,
          lineHeight: 1.2,
          color: C.blanc,
          background: "rgba(43, 66, 88, 0.9)",
          padding: "16px 30px 18px",
          borderRadius: 6,
          maxWidth: 920,
          textAlign: "center",
          opacity: appear,
          transform: `translateY(${(1 - appear) * 14}px)`,
        }}
      >
        <Rich text={text} />
      </div>
    </AbsoluteFill>
  );
};

// Bandeau nom / fonction, ancré à gauche, avec le trait or du G en repère
export const LowerThird: React.FC<{ nom: string; role: string; structure: string; duration: number }> = ({
  nom,
  role,
  structure,
  duration,
}) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar = interpolate(frame, [6, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 1050,
          background: C.marine,
          padding: "30px 56px 32px 72px",
          clipPath: `inset(0 ${(1 - inP) * 100}% 0 0)`,
          fontFamily: FONT,
          color: C.blanc,
        }}
      >
        <div style={{ width: 72 * bar, height: 10, borderRadius: 5, background: C.or, marginBottom: 18 }} />
        <div style={{ fontWeight: 800, fontSize: 56, lineHeight: 1.05, letterSpacing: -0.5 }}>{nom}</div>
        <div style={{ fontWeight: 500, fontSize: 32, marginTop: 10 }}>{role}</div>
        <div style={{ fontWeight: 500, fontSize: 28, marginTop: 4, opacity: 0.75 }}>{structure}</div>
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
