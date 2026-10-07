import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { C } from "./theme";

type Props = {
  text: string;
  start: number; // image d'entrée (temps local de la scène)
  exit?: number; // image de sortie (optionnelle)
  stagger?: number;
  style?: React.CSSProperties;
};

// Texte cinétique : chaque mot monte depuis le masque de sa ligne, avec un ressort
export const Words: React.FC<Props> = ({ text, start, exit, stagger = 2, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let gold = false;
  let j = 0;
  return (
    <div style={{ fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, ...style }}>
      {text.split("|").map((line, li) => (
        <span key={li} style={{ display: "block", overflow: "hidden", padding: "0.06em 0 0.12em", margin: "-0.06em 0 -0.12em" }}>
          {line.split(" ").map((w, wi) => {
            if (w.startsWith("*")) gold = true;
            const isGold = gold;
            if (w.endsWith("*")) gold = false;
            const k = j++;
            const p = spring({ frame: frame - start - k * stagger, fps, config: { damping: 18, stiffness: 140, mass: 0.7 } });
            const q = exit === undefined ? 0
              : interpolate(frame, [exit + k, exit + k + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
            return (
              <React.Fragment key={wi}>
                <span style={{ display: "inline-block", color: isGold ? C.or : undefined, transform: `translateY(${(1 - p) * 115 - q * 115}%)` }}>
                  {w.replace(/\*/g, "")}
                </span>
                {wi < line.split(" ").length - 1 ? " " : null}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </div>
  );
};

// Filet doré vertical qui se trace (signature graphique GNI)
export const Filet: React.FC<{ start: number; left: number; top: number; height: number }> = ({ start, left, top, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - start, fps, config: { damping: 200 } });
  return <div style={{ position: "absolute", left, top, width: 10, height, background: C.or, transformOrigin: "center top", transform: `scaleY(${p})` }} />;
};
