import React, { useContext } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

// Motion design sur les informations clés — charte GNI : marine, or, Montserrat, trait or du « G »
// Chaque élément entre avec un ressort (un peu de rebond pour le « peps ») et sort en glissant.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Style graphique des animations (choisi une fois pour toute la vidéo)
// carre     : blocs marine à angles droits, capitales (version d'origine)
// doux      : bulles arrondies marine translucides (verre dépoli), texte en minuscules
// manuscrit : mot-clé manuscrit or (Allison) sans cadre, trait or courbe qui se dessine
// surligne  : coup de surligneur or arrondi et légèrement incliné, texte marine
export type StyleMD = "carre" | "doux" | "manuscrit" | "surligne";
export const StyleMDContext = React.createContext<StyleMD>("doux");
const OMBRE = "0 2px 18px rgba(0,0,0,0.45), 0 0 3px rgba(0,0,0,0.3)";
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
  const style = useContext(StyleMDContext);
  const frame = useCurrentFrame();
  const flotte = Math.sin(frame / 12) * 3; // léger flottement
  const place: React.CSSProperties = { position: "absolute", top, [cote === "gauche" ? "left" : "right"]: 60 };
  if (style === "doux") {
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            ...place,
            background: "rgba(43, 66, 88, 0.72)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: 44,
            padding: sousTexte ? "16px 36px 20px" : "16px 38px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: Math.min(1, e * 1.4) * (1 - s),
            transform: `translateY(${(1 - e) * 30 + flotte - s * 20}px) scale(${0.6 + 0.4 * Math.min(e, 1.04)})`,
            transformOrigin: cote === "gauche" ? "left center" : "right center",
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: 8, background: C.or, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 52, color: C.blanc, lineHeight: 1.1 }}>{texte}</div>
            {sousTexte ? <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 28, color: C.or, marginTop: 2 }}>{sousTexte}</div> : null}
          </div>
        </div>
      </AbsoluteFill>
    );
  }
  if (style === "manuscrit") {
    const trait = interpolate(frame - delai, [8, 26], [0, 1], { ...clamp, easing: ease });
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            ...place,
            textAlign: cote === "gauche" ? "left" : "right",
            opacity: Math.min(1, e * 1.4) * (1 - s),
            transform: `translateY(${(1 - e) * 30 + flotte - s * 20}px) rotate(-3deg)`,
            transformOrigin: cote === "gauche" ? "left center" : "right center",
          }}
        >
          <div style={{ fontFamily: "Allison, cursive", fontSize: 150, lineHeight: 0.85, color: C.or, textShadow: OMBRE, padding: "0 10px" }}>{texte}</div>
          <svg width={420} height={40} viewBox="0 0 420 40" style={{ display: "block", marginLeft: cote === "gauche" ? 10 : "auto" }}>
            <path
              d="M6 28 C 120 6, 260 6, 414 22"
              fill="none"
              stroke={C.or}
              strokeWidth={7}
              strokeLinecap="round"
              strokeDasharray={430}
              strokeDashoffset={430 * (1 - trait)}
            />
          </svg>
          {sousTexte ? (
            <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 30, color: C.blanc, textShadow: OMBRE, marginTop: 4, padding: "0 12px" }}>{sousTexte}</div>
          ) : null}
        </div>
      </AbsoluteFill>
    );
  }
  if (style === "surligne") {
    const marq = interpolate(frame - delai, [2, 14], [0, 1], { ...clamp, easing: ease });
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            ...place,
            opacity: 1 - s,
            transform: `rotate(-2.5deg) translateY(${flotte - s * 20}px)`,
            transformOrigin: cote === "gauche" ? "left center" : "right center",
            textAlign: cote === "gauche" ? "left" : "right",
          }}
        >
          <div style={{ position: "relative", display: "inline-block", padding: "10px 30px 16px" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: C.or,
                borderRadius: 22,
                transform: `scaleX(${marq})`,
                transformOrigin: cote === "gauche" ? "left center" : "right center",
              }}
            />
            <div
              style={{
                position: "relative",
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 58,
                color: C.marine,
                lineHeight: 1.05,
                opacity: interpolate(frame - delai, [8, 14], [0, 1], clamp),
                transform: `scale(${0.9 + 0.1 * Math.min(e, 1.05)})`,
              }}
            >
              {texte}
            </div>
          </div>
          {sousTexte ? (
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 30,
                color: C.blanc,
                textShadow: OMBRE,
                marginTop: 8,
                padding: "0 14px",
                opacity: interpolate(frame - delai, [14, 22], [0, 1], clamp),
              }}
            >
              {sousTexte}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    );
  }
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
  const style = useContext(StyleMDContext);
  const flotte = Math.sin(frame / 12) * 3;
  if (style === "doux") {
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top,
            left: 60,
            background: "rgba(43, 66, 88, 0.72)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: 48,
            padding: "18px 44px 26px 38px",
            opacity: Math.min(1, e * 1.4) * (1 - s),
            transform: `translateY(${(1 - e) * 40 + flotte - s * 30}px) scale(${0.6 + 0.4 * Math.min(e, 1.04)})`,
            transformOrigin: "left top",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 150, lineHeight: 1, color: C.or, letterSpacing: -4 }}>{n}</span>
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 56, color: C.blanc }}>{unite}</span>
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 32, color: C.blanc, opacity: 0.9, marginTop: 4 }}>{legende}</div>
        </div>
      </AbsoluteFill>
    );
  }
  if (style === "manuscrit") {
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top,
            left: 70,
            opacity: Math.min(1, e * 1.4) * (1 - s),
            transform: `translateY(${(1 - e) * 40 + flotte - s * 30}px) rotate(-3deg)`,
            transformOrigin: "left top",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 170, lineHeight: 1, color: C.or, letterSpacing: -5, textShadow: OMBRE }}>{n}</span>
            <span style={{ fontFamily: "Allison, cursive", fontSize: 130, color: C.blanc, textShadow: OMBRE, lineHeight: 0.8 }}>{unite}</span>
          </div>
          <svg width={360} height={34} viewBox="0 0 360 34" style={{ display: "block" }}>
            <path d="M6 22 C 100 6, 230 6, 354 18" fill="none" stroke={C.or} strokeWidth={7} strokeLinecap="round" strokeDasharray={370} strokeDashoffset={370 * (1 - trait)} />
          </svg>
          <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 32, color: C.blanc, textShadow: OMBRE, marginTop: 4 }}>{legende}</div>
        </div>
      </AbsoluteFill>
    );
  }
  if (style === "surligne") {
    const marq = interpolate(frame, [2, 14], [0, 1], { ...clamp, easing: ease });
    return (
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div style={{ position: "absolute", top, left: 60, opacity: 1 - s, transform: `rotate(-2.5deg) translateY(${flotte - s * 30}px)`, transformOrigin: "left top" }}>
          <div style={{ position: "relative", display: "inline-block", padding: "6px 34px 14px" }}>
            <div style={{ position: "absolute", inset: 0, background: C.or, borderRadius: 26, transform: `scaleX(${marq})`, transformOrigin: "left center" }} />
            <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 12, opacity: interpolate(frame, [8, 14], [0, 1], clamp) }}>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 150, lineHeight: 1, color: C.marine, letterSpacing: -4 }}>{n}</span>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 56, color: C.marine }}>{unite}</span>
            </div>
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 32, color: C.blanc, textShadow: OMBRE, marginTop: 10, padding: "0 16px" }}>{legende}</div>
        </div>
      </AbsoluteFill>
    );
  }
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
