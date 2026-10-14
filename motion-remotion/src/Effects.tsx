import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* Halo de lumière très doux qui dérive lentement : donne de la profondeur au fond uni */
export const Halo: React.FC = () => {
  const f = useCurrentFrame();
  const x = 540 + 320 * Math.sin(f / 95), y = 760 + 300 * Math.cos(f / 120);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", opacity: 0.16,
      background: `radial-gradient(circle 760px at ${x}px ${y}px, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)` }} />
  );
};

/* Grain cinéma discret, renouvelé à chaque image */
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.09 }}>
      <svg width="1080" height="1920">
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={f % 24} stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/* Reflet lumineux qui traverse l'écran en diagonale aux changements de scène */
export const Reflets: React.FC<{ at: number[] }> = ({ at }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden", mixBlendMode: "screen" }}>
      {at.map((t) => {
        const p = interpolate(f, [t - 9, t + 9], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
        if (p <= 0 || p >= 1) return null;
        return (
          <div key={t} style={{ position: "absolute", top: -600, left: 0, width: 520, height: 3200,
            transform: `translateX(${-900 + p * 2700}px) rotate(18deg)`, opacity: Math.sin(p * Math.PI) * 0.55,
            background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0))" }} />
        );
      })}
    </AbsoluteFill>
  );
};
