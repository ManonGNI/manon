import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export const cover: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };

// Fondu de 4 images en entrée / sortie de chaque coupe pour éviter les clics audio
export const fades = (duration: number) => (f: number) =>
  interpolate(f, [0, 4, duration - 4, duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Plan serré sur Alexandra seule : fenêtre 540 × 960 de l'image 1080 × 1920 (Loïc hors champ)
const CADRE = { x: 540, y: 740, w: 540 };
export const PlanSerre: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ transformOrigin: "0 0", transform: `scale(${1080 / CADRE.w}) translate(${-CADRE.x}px, ${-CADRE.y}px)` }}>
    {children}
  </AbsoluteFill>
);

// Fondu enchaîné vers le plan serré (opacité 0 → 1, léger recul d'échelle 1,06 → 1)
export const FonduPlanSerre: React.FC<{ duration: number; children: React.ReactNode }> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });
  return <AbsoluteFill style={{ opacity: p, transform: `scale(${1.06 - 0.06 * p})` }}>{children}</AbsoluteFill>;
};
