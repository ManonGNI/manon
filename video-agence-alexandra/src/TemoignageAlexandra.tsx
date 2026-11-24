import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions, EcranFin, LogoSignature, LowerThird, TitreAccroche } from "./Overlays";
import { GROUPEMENT, MEDIA, PERSONNES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

// Vidéo 2 — témoignage : « Pourquoi rejoindre un groupement ? »
// Durées (images à 30 i/s)
const D = { accroche: 172, qGroupement: 36, proximite: 44, humain: 81, valeurs: 180, communaute1: 213, communaute2: 120, accompagne: 79, avantgarde: 136, fin: 135 };
const FIN_START = D.accroche + D.qGroupement + D.proximite + D.humain + D.valeurs + D.communaute1 + D.communaute2 + D.accompagne + D.avantgarde; // 1061
export const DUREE_TEMOIGNAGE = FIN_START + D.fin; // 1196

export const TemoignageAlexandra: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        {/* 1. Accroche, plan serré : « une agence isolée… ce n'est plus d'actualité » */}
        <Series.Sequence name="Accroche" durationInFrames={172} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.isolee} trimBefore={26} style={cover} volume={fades(172)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.isoleeAccroche} offset={291.4 + 26 / 30} />
        </Series.Sequence>

        {/* 2. Loïc : « Pourquoi avoir rejoint le groupement ? » */}
        <Series.Sequence name="Question : groupement" durationInFrames={36} premountFor={fps}>
          <PlanSerre sur="loic">
            <Video src={MEDIA.questionGroupement} style={cover} volume={fades(36)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.qGroupement} offset={249.15} />
        </Series.Sequence>

        {/* 3. Plan large : la proximité, le contact humain */}
        <Series.Sequence name="Proximité" durationInFrames={44} premountFor={fps}>
          <Video src={MEDIA.proximite} style={cover} volume={fades(44)} />
          <Captions items={SOUS_TITRES.proximite} offset={257.62} />
        </Series.Sequence>
        <Series.Sequence name="Contact humain" durationInFrames={81} premountFor={fps}>
          <Video src={MEDIA.humain} style={cover} volume={fades(81)} />
          <Sequence name="Fondu vers plan serré" from={69} durationInFrames={12} premountFor={fps}>
            <FonduPlanSerre duration={12}>
              <PlanSerre>
                <Video src={MEDIA.valeurs} muted style={cover} />
              </PlanSerre>
            </FonduPlanSerre>
          </Sequence>
          <Captions items={SOUS_TITRES.humain} offset={263.22} />
        </Series.Sequence>

        {/* 4. Plan serré : les valeurs, l'écoute */}
        <Series.Sequence name="Valeurs" durationInFrames={180} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.valeurs} trimBefore={12} style={cover} volume={fades(180)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.valeurs} offset={272.4} />
        </Series.Sequence>

        {/* 5. Être en communauté : plan large puis plan serré */}
        <Series.Sequence name="Communauté" durationInFrames={213} premountFor={fps}>
          <Video src={MEDIA.communaute1} style={cover} volume={fades(213)} />
          <Captions items={SOUS_TITRES.communaute1} offset={299.1} />
        </Series.Sequence>
        <Series.Sequence name="Nos forces" durationInFrames={120} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.communaute2} style={cover} volume={fades(120)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.communaute2} offset={307.45} />
        </Series.Sequence>

        {/* 6. Plan large : accompagnée, esprit avant-gardiste */}
        <Series.Sequence name="Accompagnée" durationInFrames={79} premountFor={fps}>
          <Video src={MEDIA.accompagne} trimBefore={12} style={cover} volume={fades(79)} />
          <Captions items={SOUS_TITRES.accompagne} offset={385.5} />
        </Series.Sequence>
        <Series.Sequence name="Avant-gardiste" durationInFrames={136} premountFor={fps}>
          <Video src={MEDIA.avantgarde} style={cover} volume={fades(136)} />
          <Captions items={SOUS_TITRES.avantgarde} offset={389.5} />
        </Series.Sequence>
      </Series>

      {/* Accroche en haut, puis bandeau d'Alexandra (sur le buste, plan serré) */}
      <Sequence name="Titre accroche" durationInFrames={95}>
        <TitreAccroche lignes={["Pourquoi rejoindre", "un groupement ?"]} duration={95} />
      </Sequence>
      <Sequence name="Bandeau Alexandra" from={88} durationInFrames={84}>
        <LowerThird {...PERSONNES.alexandra} duration={84} />
      </Sequence>

      <Sequence name="Logo signature" from={95} durationInFrames={FIN_START - 95}>
        <LogoSignature duration={FIN_START - 95} variante="bleu" />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <EcranFin accroche={GROUPEMENT.accroche} nom={GROUPEMENT.lignes} villes={[GROUPEMENT.site]} tailleNom={74} />
      </Sequence>
    </AbsoluteFill>
  );
};
