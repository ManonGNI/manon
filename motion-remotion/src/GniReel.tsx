import React from "react";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { Intro, Souvenirs, Vingt, Passage, Reseau, Fin } from "./Scenes";

// Durées des scènes (images à 30 i/s) et des transitions qui se chevauchent
const S = { intro: 100, souvenirs: 270, vingt: 150, passage: 180, reseau: 150, fin: 138 };
const T = { a: 20, b: 10, c: 22, d: 18, e: 18 };
export const DURATION = Object.values(S).reduce((a, b) => a + b, 0) - Object.values(T).reduce((a, b) => a + b, 0);

export const GniReel: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={S.intro}><Intro /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.a })} />
    <TransitionSeries.Sequence durationInFrames={S.souvenirs}><Souvenirs /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.b })} />
    <TransitionSeries.Sequence durationInFrames={S.vingt}><Vingt /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={clockWipe({ width: 1080, height: 1920 })} timing={linearTiming({ durationInFrames: T.c })} />
    <TransitionSeries.Sequence durationInFrames={S.passage}><Passage /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.d })} />
    <TransitionSeries.Sequence durationInFrames={S.reseau}><Reseau /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.e })} />
    <TransitionSeries.Sequence durationInFrames={S.fin}><Fin /></TransitionSeries.Sequence>
  </TransitionSeries>
);
