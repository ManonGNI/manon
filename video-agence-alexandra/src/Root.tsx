import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { AgenceAlexandra, DUREE_TOTALE } from "./AgenceAlexandra";
import { DUREE_TEMOIGNAGE, TemoignageAlexandra } from "./TemoignageAlexandra";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Vidéo 1 : bienvenue à l'agence */}
    <Composition id="AgenceAlexandra" component={AgenceAlexandra} durationInFrames={DUREE_TOTALE} fps={30} width={1080} height={1920} />
    {/* Vidéo 2 : témoignage « Pourquoi rejoindre un groupement ? » */}
    <Composition id="TemoignageAlexandra" component={TemoignageAlexandra} durationInFrames={DUREE_TEMOIGNAGE} fps={30} width={1080} height={1920} />
  </>
);
