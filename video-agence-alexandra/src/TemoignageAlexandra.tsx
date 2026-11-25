import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions, EcranFinGroupementIvoire, LogoSignature, LowerThird, TitreAccroche } from "./Overlays";
import { GROUPEMENT, MEDIA, PERSONNES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

// Vidéo 2 — témoignage : « Pourquoi rejoindre un groupement ? »
// Durées (images à 30 i/s)
const D = { accroche: 172, qGroupement: 36, proximite: 250, valeurs: 180, communaute: 371, finEchange: 555, fin: 135 };
const FIN_START = D.accroche + D.qGroupement + D.proximite + D.valeurs + D.communaute + D.finEchange; // 1564
export const DUREE_TEMOIGNAGE = FIN_START + D.fin; // 1699

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

        {/* 3. Plan large, d'un seul tenant : la proximité, le contact humain ; fondu vers le plan serré */}
        <Series.Sequence name="Proximité" durationInFrames={250} premountFor={fps}>
          <Video src={MEDIA.proximiteSuite} style={cover} volume={fades(250)} />
          <Sequence name="Fondu vers plan serré" from={238} durationInFrames={12} premountFor={fps}>
            <FonduPlanSerre duration={12}>
              <PlanSerre>
                <Video src={MEDIA.valeurs} muted style={cover} />
              </PlanSerre>
            </FonduPlanSerre>
          </Sequence>
          <Captions items={SOUS_TITRES.proximiteSuite} offset={257.62} />
        </Series.Sequence>

        {/* 4. Plan serré : les valeurs, l'écoute */}
        <Series.Sequence name="Valeurs" durationInFrames={180} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.valeurs} trimBefore={12} style={cover} volume={fades(180)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.valeurs} offset={272.4} />
        </Series.Sequence>

        {/* 5. Plan large, d'un seul tenant : être en communauté */}
        <Series.Sequence name="Communauté" durationInFrames={371} premountFor={fps}>
          <Video src={MEDIA.communaute} style={cover} volume={fades(371)} />
          <Captions items={SOUS_TITRES.communaute} offset={299.1} />
        </Series.Sequence>

        {/* 6. Plan large, d'un seul tenant jusqu'à la fin : « accompagnée… on n'a pas le temps »
             puis la réponse de Loïc « on est là pour ça… accompagner nos agences » ; le son s'éteint
             juste après sa phrase, l'image continue et l'écran de fin arrive en fondu */}
        <Series.Sequence name="Fin de l'échange" durationInFrames={555} premountFor={fps}>
          <Video src={MEDIA.accompagneFin} style={cover} volume={fades(555)} />
          <Captions items={[...SOUS_TITRES.accompagneSuite, ...SOUS_TITRES.loicTemps]} offset={385.5} />
        </Series.Sequence>
      </Series>

      {/* Accroche en haut, puis bandeau d'Alexandra (sur le buste, plan serré) */}
      <Sequence name="Titre accroche" durationInFrames={95}>
        <TitreAccroche lignes={["Pourquoi Alexandra", "a rejoint notre Groupe ?"]} duration={95} />
      </Sequence>
      <Sequence name="Bandeau Alexandra" from={88} durationInFrames={84}>
        <LowerThird {...PERSONNES.alexandra} duration={84} />
      </Sequence>

      <Sequence name="Logo signature" from={95} durationInFrames={FIN_START - 95}>
        <LogoSignature duration={FIN_START - 95} variante="bleu" />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 20} durationInFrames={D.fin + 20}>
        <EcranFinGroupementIvoire accroche={GROUPEMENT.accroche} lignes={GROUPEMENT.lignes} site={GROUPEMENT.site} />
      </Sequence>
    </AbsoluteFill>
  );
};
