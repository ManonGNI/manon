import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

// Motion design sur les informations clés — charte GNI : marine, or, Montserrat, trait or du « G »
// Chaque élément entre avec un ressort (un peu de rebond pour le « peps ») et sort en glissant.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);

const useEntree = (delai = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delai, fps, config: { damping: 12, stiffness: 170, mass: 0.7 } });
};
const useSortie = (duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [duration - 9, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
};

// Mot clé : bloc marine, filet or, texte blanc en capitales — glisse depuis le côté avec rebond
export const MotCle: React.FC<{
  texte: string;
  duration: number;
  top?: number;
  cote?: "gauche" | "droite";
  sousTexte?: string;
  delai?: number;
}> = ({ texte, duration, top = 220, cote = "gauche", sousTexte, delai = 0 }) => {
  const e = useEntree(delai);
  const s = useSortie(duration);
  const dx = (cote === "gauche" ? -1 : 1) * ((1 - e) * 120 + s * 160);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top,
          [cote === "gauche" ? "left" : "right"]: 60,
          display: "flex",
          opacity: Math.min(1, e * 1.4) * (1 - s),
          transform: `translateX(${dx}px) scale(${0.85 + 0.15 * Math.min(e, 1.05)})`,
          transformOrigin: cote === "gauche" ? "left center" : "right center",
        }}
      >
        <div style={{ width: 10, background: C.or }} />
        <div style={{ background: C.marine, padding: "14px 30px 18px 22px" }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 58, letterSpacing: 1, color: C.blanc, textTransform: "uppercase", lineHeight: 1.05 }}>
            {texte}
          </div>
          {sousTexte ? (
            <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 30, color: C.or, marginTop: 4 }}>{sousTexte}</div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Chiffre clé : compteur qui défile jusqu'à la valeur, en or, avec une légende
export const ChiffreCle: React.FC<{
  valeur: number;
  unite: string;
  legende: string;
  duration: number;
  top?: number;
}> = ({ valeur, unite, legende, duration, top = 170 }) => {
  const frame = useCurrentFrame();
  const e = useEntree();
  const s = useSortie(duration);
  const n = Math.round(interpolate(frame, [2, 26], [0, valeur], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const trait = interpolate(frame, [14, 30], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top,
          left: 60,
          background: C.marine,
          padding: "18px 40px 26px 34px",
          opacity: Math.min(1, e * 1.4) * (1 - s),
          transform: `translateY(${(1 - e) * -60 - s * 40}px) scale(${0.8 + 0.2 * Math.min(e, 1.05)})`,
          transformOrigin: "left top",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 170, lineHeight: 1, color: C.or, letterSpacing: -4 }}>{n}</span>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.blanc, textTransform: "uppercase" }}>{unite}</span>
        </div>
        <div style={{ width: 120 * trait, height: 6, borderRadius: 3, background: C.or, margin: "10px 0 12px" }} />
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 34, color: C.blanc }}>{legende}</div>
      </div>
    </AbsoluteFill>
  );
};

// Deux agences : « 2 agences » puis les deux villes qui apparaissent quand Loïc les nomme
export const DeuxAgences: React.FC<{ villes: [string, number][]; duration: number; top?: number }> = ({ villes, duration, top = 560 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = useEntree();
  const s = useSortie(duration);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top,
          left: 60,
          opacity: Math.min(1, e * 1.4) * (1 - s),
          transform: `translateX(${(1 - e) * -120 - s * 160}px)`,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: 10, background: C.or }} />
          <div style={{ background: C.marine, padding: "12px 30px 14px 22px", display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 96, color: C.or, lineHeight: 1 }}>2</span>
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 52, color: C.blanc, textTransform: "uppercase" }}>agences</span>
          </div>
        </div>
        {villes.map(([ville, apparition], i) => {
          const p = spring({ frame: frame - apparition, fps, config: { damping: 12, stiffness: 180, mass: 0.6 } });
          return (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
                marginRight: 12,
                background: C.blanc,
                padding: "10px 22px 12px 16px",
                opacity: Math.min(1, p * 1.5),
                transform: `translateY(${(1 - p) * 30}px) scale(${0.8 + 0.2 * Math.min(p, 1.05)})`,
                transformOrigin: "left center",
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 7, background: C.or }} />
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 36, color: C.marine }}>{ville}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Réseau : un point or seul (« agence isolée ») ou un réseau de points reliés (« en communauté »)
const POINTS: [number, number][] = [
  [540, 330],
  [300, 210],
  [790, 200],
  [190, 400],
  [900, 420],
  [380, 470],
  [700, 480],
  [520, 160],
];
export const Reseau: React.FC<{ mode: "isolee" | "reseau"; texte: string; duration: number }> = ({ mode, texte, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = useEntree();
  const s = useSortie(duration);
  const pulse = 1 + 0.12 * Math.sin(frame / 4);
  const H = 430; // panneau compact : ne couvre pas le visage en plan serré
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - s }}>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 40,
          right: 40,
          height: H,
          background: `rgba(43, 66, 88, 0.92)`,
          clipPath: `inset(0 0 ${(1 - Math.min(e, 1)) * 100}% 0)`,
        }}
      >
        <svg width={1000} height={H - 80} viewBox="20 120 1040 420" style={{ position: "absolute", top: 0, left: 0 }}>
          {mode === "reseau"
            ? POINTS.slice(1).map(([x, y], i) => {
                const p = interpolate(frame, [8 + i * 4, 20 + i * 4], [0, 1], { ...clamp, easing: ease });
                const [cx, cy] = POINTS[0];
                return (
                  <line key={`l${i}`} x1={cx} y1={cy} x2={cx + (x - cx) * p} y2={cy + (y - cy) * p} stroke={C.or} strokeWidth={4} strokeOpacity={0.8} />
                );
              })
            : null}
          {mode === "reseau"
            ? POINTS.slice(1).map(([x, y], i) => {
                const p = spring({ frame: frame - (14 + i * 4), fps, config: { damping: 10, stiffness: 200, mass: 0.5 } });
                return <circle key={`p${i}`} cx={x} cy={y} r={20 * Math.max(0, p)} fill={C.blanc} />;
              })
            : null}
          <circle cx={POINTS[0][0]} cy={POINTS[0][1]} r={34 * Math.min(e, 1.1) * (mode === "isolee" ? pulse : 1)} fill={C.or} />
          {mode === "isolee" ? (
            <circle
              cx={POINTS[0][0]}
              cy={POINTS[0][1]}
              r={34 + ((frame * 2) % 60)}
              fill="none"
              stroke={C.or}
              strokeWidth={3}
              strokeOpacity={Math.max(0, 1 - ((frame * 2) % 60) / 60)}
            />
          ) : null}
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: 22,
            width: "100%",
            textAlign: "center",
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 50,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: C.blanc,
            opacity: interpolate(frame, [10, 20], [0, 1], clamp),
          }}
        >
          {texte}
        </div>
      </div>
    </AbsoluteFill>
  );
};
