import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { AgenceAlexandra, DUREE_TOTALE } from "./AgenceAlexandra";
import { DUREE_TEMOIGNAGE, TemoignageAlexandra } from "./TemoignageAlexandra";
import { EcranFinPartenaire, VarianteFin } from "./Overlays";
import { MEDIA } from "./theme";

// Aperçu de l'écran de fin partenaire seul, pour comparer les variantes
const FinPartenaire: React.FC<{ variante: VarianteFin }> = ({ variante }) => (
  <EcranFinPartenaire variante={variante} logoAgence={MEDIA.logoAlexandra} ratioLogo={1082 / 785} fond={MEDIA.fondAlexandra} />
);

export const RemotionRoot: React.FC = () => (
  <>
    {/* Vidéo 1 : bienvenue à l'agence */}
    <Composition id="AgenceAlexandra" component={AgenceAlexandra} durationInFrames={DUREE_TOTALE} fps={30} width={1080} height={1920} />
    {/* Vidéo 2 : témoignage « Pourquoi rejoindre un groupement ? » */}
    <Composition id="TemoignageAlexandra" component={TemoignageAlexandra} durationInFrames={DUREE_TEMOIGNAGE} fps={30} width={1080} height={1920} />
    <Composition id="FinPartenaire" component={FinPartenaire} durationInFrames={143} fps={30} width={1080} height={1920} defaultProps={{ variante: "bandeau" as VarianteFin }} />
  </>
);
