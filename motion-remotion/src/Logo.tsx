import React from "react";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { MEDIA } from "./theme";

// Bloc-marque officiel découpé en 3 calques (jamais redessiné) :
// le filet se trace, le texte se révèle depuis le filet, la barre du G entre comme une clé
export const NewLogo: React.FC<{ start: number; width: number; left: number; top: number; speed?: number }> = ({ start, width, left, top, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = (frame - start) * speed;
  const pf = spring({ frame: f, fps, config: { damping: 200 } });
  const pt = interpolate(f, [8, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.exp) });
  const pb = spring({ frame: f - 28, fps, config: { damping: 11, stiffness: 160, mass: 0.6 } });
  const layer: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };
  return (
    <div style={{ position: "absolute", left, top, width, aspectRatio: "1033 / 565" }}>
      <Img src={MEDIA.filet} style={{ ...layer, opacity: f > 0 ? 1 : 0, transform: `scaleY(${pf})` }} />
      <Img src={MEDIA.texte} style={{ ...layer, clipPath: `inset(0 ${(1 - pt) * 100}% 0 0)`, transform: `translateX(${(1 - pt) * -60}px)` }} />
      <Img src={MEDIA.barre} style={{ ...layer, opacity: f > 28 ? 1 : 0, transform: `translateX(${(1 - pb) * -240}px)` }} />
    </div>
  );
};
