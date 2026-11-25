import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// Étalonnage léger appliqué à toutes les vidéos : un peu plus chaud et contrasté (rushs d'origine un peu froids et gris)
export const cover: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "contrast(1.05) saturate(1.06) sepia(0.06) brightness(1.03)",
};

// Micro-fondu sonore de 2 images à chaque coupe : évite les clics sans créer de trou dans la voix
export const fades = (duration: number) => (f: number) =>
  interpolate(f, [0, 2, duration - 2, duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Plans serrés : fenêtre 540 × 960 de l'image 1080 × 1920
// alexandra = moitié droite (Loïc hors champ) ; loic = moitié gauche (Alexandra hors champ)
const CADRES = { alexandra: { x: 540, y: 740, w: 540 }, loic: { x: 0, y: 740, w: 540 } };
export const PlanSerre: React.FC<{ children: React.ReactNode; sur?: keyof typeof CADRES }> = ({ children, sur = "alexandra" }) => {
  const c = CADRES[sur];
  return (
    <AbsoluteFill style={{ transformOrigin: "0 0", transform: `scale(${1080 / c.w}) translate(${-c.x}px, ${-c.y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

// Fondu enchaîné vers le plan suivant (opacité 0 → 1) ; avec zoom, léger recul d'échelle 1,06 → 1
export const FonduPlanSerre: React.FC<{ duration: number; children: React.ReactNode; zoom?: boolean }> = ({ duration, children, zoom = true }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });
  return <AbsoluteFill style={{ opacity: p, transform: zoom ? `scale(${1.06 - 0.06 * p})` : undefined }}>{children}</AbsoluteFill>;
};
