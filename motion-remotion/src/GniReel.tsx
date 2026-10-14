import React from "react";
import { AbsoluteFill, interpolateColors, useCurrentFrame } from "remotion";
import { BgContext } from "./bg";
import { Grain } from "./Effects";
import { BLEU_ANCIEN, BLEU_NOUVEAU } from "./theme";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Intro, Souvenirs, Vingt, Chapitre, Fin } from "./Scenes";

// Durées des scènes (images à 30 i/s) et des transitions qui se chevauchent
const S = { intro: 100, souvenirs: 240, vingt: 140, chapitre: 150, fin: 235 };
const T = { a: 20, b: 10, c: 18, f: 18 };
export const DURATION = Object.values(S).reduce((a, b) => a + b, 0) - Object.values(T).reduce((a, b) => a + b, 0);

export const GniReel: React.FC = () => {
  const frame = useCurrentFrame();
  // dégradé dans le temps : ancien bleu au début, nouveau bleu au moment où le G se transforme
  const bg = interpolateColors(frame, [40, DURATION - 100], [BLEU_ANCIEN, BLEU_NOUVEAU]);
  return (
  <AbsoluteFill style={{ background: bg }}>
  <BgContext.Provider value={bg}>
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={S.intro}><Intro /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.a })} />
    <TransitionSeries.Sequence durationInFrames={S.souvenirs}><Souvenirs /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.b })} />
    <TransitionSeries.Sequence durationInFrames={S.vingt}><Vingt /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.c })} />
    <TransitionSeries.Sequence durationInFrames={S.chapitre}><Chapitre /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.f })} />
    <TransitionSeries.Sequence durationInFrames={S.fin}><Fin /></TransitionSeries.Sequence>
  </TransitionSeries>
  <Grain />
  </BgContext.Provider>
  </AbsoluteFill>
  );
};
