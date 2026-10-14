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
  const ph = PHOTOS_20[Math.floor(frame / 9) % PHOTOS_20.length];
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, transform: `scale(${1 + hit(frame, 36)})` }}>
      <div style={{ position: "absolute", left: 30, top: 300, padding: "0 20px", fontWeight: 800, fontSize: 840, lineHeight: 0.86, letterSpacing: "-0.07em",
        color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: `url(${PHOTOS[ph]})`, backgroundSize: "cover",
        backgroundPosition: `${50 + 10 * Math.sin(frame / 20)}% 50%`, fontVariantNumeric: "tabular-nums",
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

/* 7 — Fin : zoom sur le G de l'ancien logo, qui se transforme en G du nouveau logo */
const LOGO_W = 860, LOGO_X = 110, LOGO_Y = 700;
const K = LOGO_W / G.logo[0];                                   // échelle du fichier logo à l'écran
const GC = { x: LOGO_X + ((G.box[0] + G.box[2]) / 2) * K, y: LOGO_Y + ((G.box[1] + G.box[3]) / 2) * K };
const TARGET = { x: 540, y: 880, h: 720 };                       // G final : centré, 720 px de haut
const ZOOM = TARGET.h / (G.h * K);
const morph = interpolatePath(G.oldPath, G.newPath, { maxSegmentLength: 2 });

export const Fin: React.FC = () => {
  const bg = useBg();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pin = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 16 });
  const z = interpolate(frame, [22, 54], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const scale = Math.exp(Math.log(ZOOM) * z);                   // zoom régulier (logarithmique)
  const m = interpolate(frame, [58, 84], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const bar = spring({ frame: frame - 88, fps, config: { damping: 12, stiffness: 150, mass: 0.6 } });
  // Tout est vectoriel : le zoom se fait en changeant la viewBox du SVG, donc le tracé reste net à toutes les échelles
  const s = K * scale;                                           // px du fichier logo -> px écran
  const gc = { x: (G.box[0] + G.box[2]) / 2, y: (G.box[1] + G.box[3]) / 2 };
  const sc = { x: GC.x + (TARGET.x - GC.x) * z, y: GC.y + (TARGET.y - GC.y) * z };
  const viewBox = `${gc.x - sc.x / s} ${gc.y - sc.y / s} ${1080 / s} ${1920 / s}`;
  const rest = 1 - interpolate(frame, [48, 58], [0, 1], clamp);  // le reste du logo s'efface, seul le G reste
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, transform: `scale(${1 + hit(frame, 98)})` }}>
      <svg viewBox={viewBox} width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: pin, filter: `blur(${(1 - pin) * 10}px)` }}>
        <path d={G.restPath} fill={C.blanc} opacity={rest} />
        <defs>
          <radialGradient id="haloG"><stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" /><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" /></radialGradient>
          <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0" /><stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.85" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" /></linearGradient>
          <clipPath id="barClip" transform={`translate(${G.box[0]} ${G.box[1]})`}><path d={G.barPath} /></clipPath>
        </defs>
        <circle cx={(G.box[0] + G.box[2]) / 2} cy={(G.box[1] + G.box[3]) / 2} r={G.h * 1.1} fill="url(#haloG)" opacity={interpolate(frame, [86, 110], [0, 1], clamp)} />
        <g transform={`translate(${G.box[0]} ${G.box[1]})`}>
          <path d={morph(m)} fill={C.blanc} />
          <path d={G.barPath} fill={NOUVEAU.or} opacity={frame >= 88 ? 1 : 0} transform={`translate(${(1 - bar) * -70} 0)`} />
        </g>
        <g clipPath="url(#barClip)">
          <rect x={G.box[0] + interpolate(frame, [104, 122], [-40, G.w + 20], clamp)} y={G.box[1]} width={30} height={G.h} fill="url(#shine)" transform={`skewX(-20)`} />
        </g>
      </svg>
      <Words text={TEXTES.fin} start={104} stagger={1} style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1330, fontSize: 46, fontWeight: 700, letterSpacing: 0, color: C.blanc }} />
      <div style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1420, fontSize: 32, fontWeight: 500, color: C.blanc,
        opacity: interpolate(frame, [116, 130], [0, 1], clamp) }}>{TEXTES.site}</div>
    </AbsoluteFill>
  );
};
