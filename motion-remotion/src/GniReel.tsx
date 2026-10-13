import React from "react";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { Intro, Souvenirs, Vingt, Passage, Chapitre, Fin } from "./Scenes";

// Durées des scènes (images à 30 i/s) et des transitions qui se chevauchent
const S = { intro: 100, souvenirs: 240, vingt: 140, passage: 90, chapitre: 150, fin: 120 };
const T = { a: 20, b: 10, c: 22, d: 12, f: 18 };
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
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T.d })} />
    <TransitionSeries.Sequence durationInFrames={S.chapitre}><Chapitre /></TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T.f })} />
    <TransitionSeries.Sequence durationInFrames={S.fin}><Fin /></TransitionSeries.Sequence>
  </TransitionSeries>
);
