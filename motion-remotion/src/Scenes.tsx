import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { C, FONT, MEDIA, PHOTOS, TEXTES, VIGNETTES } from "./theme";
import { Filet, Words } from "./Words";
import { NewLogo } from "./Logo";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
// petit « coup de caméra » qui retombe
const hit = (frame: number, at: number) => (frame >= at ? 0.04 * Math.exp(-(frame - at) / 4.5) : 0);

/* 1 — 2007, l'ancien logo */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 3, fps, config: { damping: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: C.blanc, fontFamily: FONT, transform: `scale(${1 + hit(frame, 4) + hit(frame, 28)})` }}>
      <Img src={MEDIA.ancienLogo} style={{ position: "absolute", width: 800, left: 140, top: 560, opacity: p, transform: `scale(${1.15 - 0.15 * p})`, filter: `blur(${(1 - p) * 12}px)` }} />
      <Filet start={26} left={110} top={1110} height={250} />
      <Words text={TEXTES.annee} start={28} style={{ position: "absolute", left: 150, top: 1100, fontSize: 150, color: C.bleu }} />
      <Words text={TEXTES.ouverture} start={40} stagger={1} style={{ position: "absolute", left: 152, top: 1265, fontSize: 44, fontWeight: 500, letterSpacing: 0, lineHeight: 1.25, color: C.bleu }} />
    </AbsoluteFill>
  );
};

/* 2 — Mur de souvenirs : rangées de photos (format d'origine, nettes) en sens alternés */
const PER = 8, PITCH = 560, ROWS = 5;
export const PHRASE_AT = [22, 68, 114, 160, 206];
const Wall: React.FC = () => {
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
              const [ph, z, px, py] = VIGNETTES[(r * 5 + k) % VIGNETTES.length];
              return (
                <div key={k} style={{ position: "absolute", left: k * PITCH, width: 540, height: 360, backgroundColor: C.bleuFonce,
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
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const open = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 14 });
  const close = interpolate(frame, [durationInFrames - 30, durationInFrames - 20], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const zoom = interpolate(frame, [durationInFrames - 26, durationInFrames], [1, 3.2], { ...clamp, easing: Easing.in(Easing.exp) });
  return (
    <AbsoluteFill style={{ background: C.bleu, fontFamily: FONT }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <CameraMotionBlur samples={6} shutterAngle={200}>
          <Wall />
        </CameraMotionBlur>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 735, width: 1080, height: 450, background: C.bleu, transform: `scaleY(${open * (1 - close)})` }}>
        <Filet start={18} left={110} top={70} height={310} />
        {TEXTES.phrases.map((txt, i) => (
          <Words key={i} text={txt} start={PHRASE_AT[i] + 3} exit={i < PHRASE_AT.length - 1 ? PHRASE_AT[i + 1] - 9 : durationInFrames - 40}
            style={{ position: "absolute", left: 150, top: 60, fontSize: 104, color: C.blanc }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* 3 — « 20 » géant rempli de photos, compteur 00 → 20 */
export const Vingt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 18 });
  const count = Math.round(interpolate(frame, [4, 36], [0, 20], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const ph = [4, 0, 3, 2, 1][Math.floor(frame / 11) % 5];
  return (
    <AbsoluteFill style={{ background: C.bleu, fontFamily: FONT, transform: `scale(${1 + hit(frame, 36)})` }}>
      <div style={{ position: "absolute", left: 30, top: 300, padding: "0 20px", fontWeight: 800, fontSize: 840, lineHeight: 0.86, letterSpacing: "-0.07em",
        color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: `url(${PHOTOS[ph]})`, backgroundSize: "cover",
        backgroundPosition: `${50 + 10 * Math.sin(frame / 20)}% 50%`, fontVariantNumeric: "tabular-nums",
        opacity: p, transform: `scale(${1.35 - 0.35 * p})`, filter: `blur(${(1 - p) * 10}px)` }}>
        {String(count).padStart(2, "0")}
      </div>
      <Filet start={40} left={110} top={1110} height={310} />
      <Words text={TEXTES.vingt} start={42} stagger={4} style={{ position: "absolute", left: 150, top: 1100, fontSize: 150, color: C.blanc }} />
      <Words text={TEXTES.evolue} start={72} stagger={1} style={{ position: "absolute", left: 152, top: 1465, fontSize: 44, fontWeight: 500, letterSpacing: 0, color: C.blanc }} />
    </AbsoluteFill>
  );
};

/* 4 — L'ancien logo est éjecté, un filet d'or tombe et devient le filet du nouveau logo */
export const Passage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pin = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 18 });
  const eject = interpolate(frame, [44, 54], [0, 1], { ...clamp, easing: Easing.in(Easing.exp) });
  const drop = interpolate(frame, [46, 56], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
  const shrink = interpolate(frame, [57, 69], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const LOGO = { left: 130, top: 640, width: 820 };
  return (
    <AbsoluteFill style={{ background: C.blanc, fontFamily: FONT, transform: `scale(${1 + hit(frame, 46) + hit(frame, 100)})` }}>
      {frame < 56 && (
        <CameraMotionBlur samples={8} shutterAngle={260}>
          <AbsoluteFill>
            <Img src={MEDIA.ancienLogo} style={{ position: "absolute", width: 800, left: 140, top: 700, opacity: pin,
              transform: `translateX(${-eject * 1400}px) scale(${1.08 - 0.08 * pin})` }} />
          </AbsoluteFill>
        </CameraMotionBlur>
      )}
      {frame >= 46 && frame < 72 && (
        <div style={{ position: "absolute", left: 135, width: 9, background: C.or, transformOrigin: "center top",
          top: interpolate(shrink, [0, 1], [0, 645]), height: interpolate(shrink, [0, 1], [1920, 439]), transform: `scaleY(${drop})` }} />
      )}
      {frame >= 66 && <NewLogo start={66} {...LOGO} />}
      <Words text={TEXTES.identite} start={112} stagger={2} style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1310, fontSize: 46, fontWeight: 700, letterSpacing: 0, color: C.bleu }} />
    </AbsoluteFill>
  );
};

/* 5 — Le groupement demeure (photo convention) et un réseau se lance (photo de groupe qui glisse) */
export const Reseau: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = interpolate(frame, [14, 32], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
  const slideB = spring({ frame: frame - 62, fps, config: { damping: 200 }, durationInFrames: 20 });
  const photo = (src: string, from: number): React.CSSProperties => ({
    position: "absolute", inset: 0, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center",
    transform: `scale(${1.12 - 0.1 * interpolate(frame, [from, from + 80], [0, 1], clamp)})`,
  });
  return (
    <AbsoluteFill style={{ background: C.bleu, fontFamily: FONT, transform: `scale(${1 + hit(frame, 82)})` }}>
      <Words text={TEXTES.groupement} start={4} stagger={3} style={{ position: "absolute", left: 90, top: 300, fontSize: 104, color: C.blanc, whiteSpace: "nowrap" }} />
      <div style={{ position: "absolute", left: 0, top: 590, width: 1080, height: 720, overflow: "hidden", clipPath: `inset(0 ${50 * (1 - reveal)}% 0 ${50 * (1 - reveal)}%)` }}>
        <div style={photo(PHOTOS[0], 14)} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", transform: `translateX(${(1 - slideB) * 1080}px)` }}>
          <div style={photo(PHOTOS[4], 62)} />
        </div>
      </div>
      <Words text={TEXTES.reseau} start={66} stagger={3} style={{ position: "absolute", left: 90, top: 1350, fontSize: 100, color: C.blanc, whiteSpace: "nowrap" }} />
    </AbsoluteFill>
  );
};

/* 6 — Carton de fin */
export const Fin: React.FC = () => {
  const frame = useCurrentFrame();
  const sign = interpolate(frame, [42, 66], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const url = interpolate(frame, [74, 88], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: C.blanc, fontFamily: FONT, transform: `scale(${1 + hit(frame, 32)})` }}>
      <NewLogo start={4} width={760} left={160} top={520} speed={1.25} />
      <div style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1060, fontFamily: "Allison, cursive", fontSize: 150, lineHeight: 1,
        color: C.bleu, opacity: sign, clipPath: `inset(0 ${(1 - sign) * 100}% 0 0)` }}>Plus fortes ensemble.</div>
      <Words text={TEXTES.fin} start={60} stagger={1} style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1290, fontSize: 40, fontWeight: 700, letterSpacing: 0, color: C.bleu }} />
      <div style={{ position: "absolute", left: 0, width: 1080, textAlign: "center", top: 1440, fontSize: 32, fontWeight: 500, color: C.bleu,
        opacity: url, transform: `translateY(${(1 - url) * 20}px)` }}>{TEXTES.site}</div>
    </AbsoluteFill>
  );
};
