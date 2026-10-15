import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { interpolate as interpolatePath } from "flubber";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { C, FONT, MEDIA, NOUVEAU, PHOTOS, PHOTOS_20, TEXTES, VIGNETTES } from "./theme";
import { G } from "./gShapes";
import { useBg } from "./bg";
import { Words } from "./Words";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
// petit « coup de caméra » qui retombe
const hit = (frame: number, at: number) => (frame >= at ? 0.04 * Math.exp(-(frame - at) / 4.5) : 0);

/* 1 — 2007, l'ancien logo */
export const Intro: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 3, fps, config: { damping: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, transform: `scale(${1 + hit(frame, 4) + hit(frame, 28)})` }}>
      <Img src={MEDIA.ancienLogo} style={{ position: "absolute", width: 800, left: 140, top: 560, opacity: p, transform: `scale(${1.15 - 0.15 * p})`, filter: `blur(${(1 - p) * 12}px) drop-shadow(0 0 ${40 * p}px rgba(255,255,255,${0.35 * Math.max(0, 1 - Math.abs(frame - 24) / 30)}))` }} />
      <Words text={TEXTES.annee} start={28} style={{ position: "absolute", left: 100, top: 1100, fontSize: 150, color: C.blanc }} />
      <Words text={TEXTES.ouverture} start={40} stagger={1} style={{ position: "absolute", left: 102, top: 1265, fontSize: 44, fontWeight: 500, letterSpacing: 0, lineHeight: 1.25, color: C.blanc }} />
    </AbsoluteFill>
  );
};

/* 2 — Mur de souvenirs : rangées de photos (format d'origine, nettes) en sens alternés */
const PER = 8, PITCH = 560, ROWS = 5;
export const PHRASE_AT = [20, 58, 96, 134, 172];
const Wall: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // accélération à chaque changement de phrase
  let burst = 0;
  for (const h of PHRASE_AT.slice(1)) if (frame > h) burst += 300 * (1 - Math.exp(-(frame - h) / 5));
  return (
    <AbsoluteFill>
      {Array.from({ length: ROWS }).map((_, r) => {
        const dir = r % 2 ? 1 : -1;
        const speed = 95 + (r % 3) * 28;
        const period = PER * PITCH;
        const x = (((speed * t + burst + r * 173) % period) + period) % period;
        return (
          <div key={r} style={{ position: "absolute", top: -10 + r * 385, left: 0, height: 360, width: period * 2, transform: `translateX(${dir < 0 ? -x : x - period}px)` }}>
            {Array.from({ length: PER * 2 }).map((__, k) => {
              const [ph, z, px, py] = VIGNETTES[(r * PER + (k % PER)) % VIGNETTES.length];
              return (
                <div key={k} style={{ position: "absolute", left: k * PITCH, width: 540, height: 360, backgroundColor: bg,
                  backgroundImage: `url(${PHOTOS[ph]})`, backgroundSize: `${z * 100}% auto`, backgroundPosition: `${px}% ${py}%`, backgroundRepeat: "no-repeat" }} />
              );
            })}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
export const Souvenirs: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const open = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 14 });
  const close = interpolate(frame, [durationInFrames - 30, durationInFrames - 20], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const zoom = interpolate(frame, [durationInFrames - 26, durationInFrames], [1, 3.2], { ...clamp, easing: Easing.in(Easing.exp) });
  const drift = 1 + 0.06 * (frame / durationInFrames);
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT }}>
      <AbsoluteFill style={{ transform: `scale(${zoom * drift})` }}>
        <CameraMotionBlur samples={6} shutterAngle={200}>
          <Wall />
        </CameraMotionBlur>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 735, width: 1080, height: 450, background: bg, transform: `scaleY(${open * (1 - close)})` }}>
        {TEXTES.phrases.map((txt, i) => (
          <Words key={i} text={txt} start={PHRASE_AT[i] + 3} exit={i < PHRASE_AT.length - 1 ? PHRASE_AT[i + 1] - 9 : durationInFrames - 40}
            style={{ position: "absolute", left: 100, top: 60, fontSize: 104, color: C.blanc }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* 3 — « 20 » géant rempli de photos, compteur 00 → 20 */
export const Vingt: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 18 });
  const count = Math.round(interpolate(frame, [4, 36], [0, 20], { ...clamp, easing: Easing.out(Easing.cubic) }));
  // les photos défilent pendant le compteur, puis se figent sur la photo de groupe une fois « 20 » atteint
  const ph = frame < 36 ? PHOTOS_20[Math.floor(frame / 9) % PHOTOS_20.length] : 4;
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, transform: `scale(${1 + hit(frame, 36)})` }}>
      <div style={{ position: "absolute", left: 30, top: 300, padding: "0 20px", fontWeight: 800, fontSize: 840, lineHeight: 0.86, letterSpacing: "-0.07em",
        color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: `url(${PHOTOS[ph]})`, backgroundSize: "cover",
        backgroundPosition: `${50 + 10 * Math.sin(Math.min(frame, 36) / 20)}% 50%`, fontVariantNumeric: "tabular-nums",
        opacity: p, transform: `scale(${1.35 - 0.35 * p})`, filter: `blur(${(1 - p) * 10}px)` }}>
        {String(count).padStart(2, "0")}
      </div>
      <Words text={TEXTES.vingt} start={42} stagger={4} style={{ position: "absolute", left: 100, top: 1100, fontSize: 150, color: C.blanc }} />
      <Words text={TEXTES.evolue} start={72} stagger={1} style={{ position: "absolute", left: 102, top: 1465, fontSize: 44, fontWeight: 500, letterSpacing: 0, color: C.blanc }} />
    </AbsoluteFill>
  );
};

/* 6 — Un nouveau chapitre s'ouvre… Rendez-vous lundi 19 octobre */
export const Chapitre: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, transform: `scale(${1 + hit(frame, 8) + hit(frame, 80)})` }}>
      <Words text={TEXTES.chapitre} start={6} exit={60} stagger={3} style={{ position: "absolute", left: 100, top: 560, fontSize: 140, color: C.blanc, whiteSpace: "nowrap" }} />
      <Words text={TEXTES.rdv} start={68} stagger={1} style={{ position: "absolute", left: 102, top: 520, fontSize: 64, fontWeight: 700, letterSpacing: 0, color: C.blanc }} />
      <Words text={TEXTES.date} start={74} stagger={4} style={{ position: "absolute", left: 96, top: 640, fontSize: 150, color: C.blanc, whiteSpace: "nowrap" }} />
      <Words text={TEXTES.savoirPlus} start={96} stagger={2} style={{ position: "absolute", left: 102, top: 1000, fontSize: 52, fontWeight: 700, letterSpacing: 0, color: C.blanc }} />
    </AbsoluteFill>
  );
};

/* 7 — Fin : zoom sur le G de l'ancien logo, qui se transforme en G du nouveau logo,
   puis la caméra recule : la barre dorée devient la capsule centrale d'un champ de capsules (« mille identités ») */
const LOGO_W = 860, LOGO_X = 110, LOGO_Y = 700;
const K = LOGO_W / G.logo[0];                                   // échelle du fichier logo à l'écran
const GC = { x: LOGO_X + ((G.box[0] + G.box[2]) / 2) * K, y: LOGO_Y + ((G.box[1] + G.box[3]) / 2) * K };
const TARGET = { x: 540, y: 880, h: 720 };                       // G final : centré, 720 px de haut
const ZOOM = TARGET.h / (G.h * K);
const morph = interpolatePath(G.oldPath, G.newPath, { maxSegmentLength: 2 });

// Boîte de la barre dorée (coordonnées locales du G)
const BAR = (() => {
  const n = (G.barPath.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  return { x0, y0, w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
})();

// Champ de capsules : grille en quinconce, la capsule centrale (dorée) est la barre du G
const PILL = { w: 86, h: 23, px: 120, py: 59, cx: 540, cy: 900 };
const hash = (a: number, b: number) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const PILLS: { x: number; y: number; d: number; o: number; ph: number }[] = [];
for (let r = -16; r <= 17; r++) {
  for (let c = -6; c <= 6; c++) {
    const x = PILL.cx + c * PILL.px + (Math.abs(r) % 2 ? PILL.px / 2 : 0), y = PILL.cy + r * PILL.py;
    if (r === 0 && c === 0) continue;                            // place de la capsule dorée
    if (y > 1250 && y < 1490) continue;                          // respiration pour le texte
    if (x < -60 || x > 1140) continue;
    PILLS.push({ x, y, d: Math.hypot(x - PILL.cx, (y - PILL.cy) * 1.4), o: 0.1 + 0.24 * hash(r, c), ph: hash(c, r) * 6.28 });
  }
}

export const Fin: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pin = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 16 });
  const z = interpolate(frame, [22, 54], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const m = interpolate(frame, [58, 84], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const bar = spring({ frame: frame - 88, fps, config: { damping: 12, stiffness: 150, mass: 0.6 } });
  const back = interpolate(frame, [124, 162], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });   // recul de caméra
  // Tout est vectoriel : zoom et recul se font par la viewBox du SVG, le tracé reste net à toutes les échelles
  const sG = K * Math.exp(Math.log(ZOOM) * z);                   // échelle pendant le zoom sur le G
  const sEnd = PILL.w / BAR.w;                                   // échelle finale : la barre a la taille d'une capsule
  const s = Math.exp(Math.log(sG) + (Math.log(sEnd) - Math.log(sG)) * back);
  const gc = { x: (G.box[0] + G.box[2]) / 2, y: (G.box[1] + G.box[3]) / 2 };
  const bc = { x: G.box[0] + BAR.cx, y: G.box[1] + BAR.cy };
  const anchor = { x: gc.x + (bc.x - gc.x) * back, y: gc.y + (bc.y - gc.y) * back };
  const sc0 = { x: GC.x + (TARGET.x - GC.x) * z, y: GC.y + (TARGET.y - GC.y) * z };
  const sc = { x: sc0.x + (PILL.cx - sc0.x) * back, y: sc0.y + (PILL.cy - sc0.y) * back };
  const viewBox = `${anchor.x - sc.x / s} ${anchor.y - sc.y / s} ${1080 / s} ${1920 / s}`;
  const rest = 1 - interpolate(frame, [48, 58], [0, 1], clamp);  // le reste du logo s'efface, seul le G reste
  const gOut = 1 - interpolate(frame, [128, 150], [0, 1], clamp); // le G s'efface pendant le recul, la barre reste
  const sh = interpolate(frame, [102, 120], [-0.3, 1.3], clamp);  // reflet sur la barre
  const shx = G.box[0] + BAR.x0 + sh * BAR.w, sy0 = G.box[1] + BAR.y0, sy1 = sy0 + BAR.h, sk = BAR.h * 0.6;
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, transform: `scale(${1 + hit(frame, 98)})` }}>
      {/* champ de capsules, en coordonnées écran */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {PILLS.map((p, i) => {
          const a = interpolate(frame, [134 + p.d / 28, 146 + p.d / 28], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
          if (a <= 0) return null;
          const tw = 0.05 * Math.sin(frame / 11 + p.ph);           // léger scintillement
          const w = PILL.w * (0.6 + 0.4 * a);
          return <rect key={i} x={p.x - w / 2} y={p.y - PILL.h / 2} width={w} height={PILL.h} rx={PILL.h / 2} fill="#FFFFFF" opacity={a * Math.max(0.04, p.o + tw)} />;
        })}
      </svg>
      <svg viewBox={viewBox} width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: pin, filter: `blur(${(1 - pin) * 10}px)` }}>
        <defs>
          <radialGradient id="haloG"><stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" /><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" /></radialGradient>
          <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0" /><stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.85" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" /></linearGradient>
          <clipPath id="barClip"><path d={G.barPath} transform={`translate(${G.box[0]} ${G.box[1]})`} /></clipPath>
        </defs>
        <path d={G.restPath} fill={C.blanc} opacity={rest} />
        <circle cx={gc.x} cy={gc.y} r={G.h * 1.1} fill="url(#haloG)" opacity={interpolate(frame, [86, 110], [0, 1], clamp) * gOut} />
        <g transform={`translate(${G.box[0]} ${G.box[1]})`}>
          <path d={morph(m)} fill={C.blanc} opacity={gOut} />
          <path d={G.barPath} fill={NOUVEAU.or} opacity={frame >= 88 ? 1 : 0} transform={`translate(${(1 - bar) * -70} 0)`} />
        </g>
        <g clipPath="url(#barClip)">
          <polygon points={`${shx + sk},${sy0} ${shx + sk + 9},${sy0} ${shx + 9},${sy1} ${shx},${sy1}`} fill="url(#shine)" />
        </g>
      </svg>
      <Words text={TEXTES.fin} start={168} stagger={1} style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1318, fontSize: 46, fontWeight: 700, letterSpacing: 0, color: C.blanc }} />
      <div style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1400, fontSize: 32, fontWeight: 500, color: C.blanc,
        opacity: interpolate(frame, [180, 194], [0, 1], clamp) }}>{TEXTES.site}</div>
    </AbsoluteFill>
  );
};
