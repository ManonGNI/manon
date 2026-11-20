import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { AgenceAlexandra, DUREE_TOTALE } from "./AgenceAlexandra";

export const RemotionRoot: React.FC = () => (
  <Composition id="AgenceAlexandra" component={AgenceAlexandra} durationInFrames={DUREE_TOTALE} fps={30} width={1080} height={1920} />
);
