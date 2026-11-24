import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions, EcranFin, LogoSignature, LowerThird } from "./Overlays";
import { AGENCE, MEDIA, PERSONNES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

// Durées (images à 30 i/s)
const D = { intro: 454, debut: 75, conseil: 222, proximite: 44, humain: 81, accompagne: 79, avantgarde: 136, merci: 89, fin: 135 };
const DEBUT_INTERVIEW = D.intro;
const FIN_START = D.intro + D.debut + D.conseil + D.proximite + D.humain + D.accompagne + D.avantgarde + D.merci; // 1180
export const DUREE_TOTALE = FIN_START + D.fin; // 1315

export const AgenceAlexandra: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        {/* 1. Loïc présente l'agence, devant la façade */}
        <Series.Sequence name="Intro Loïc" durationInFrames={454} premountFor={fps}>
          <Video src={MEDIA.intro} style={cover} volume={fades(454)} />
          <Captions items={SOUS_TITRES.intro} offset={7.6} />
        </Series.Sequence>

        {/* 2. Alexandra : son parcours et sa vision du métier (plan large) */}
        <Series.Sequence name="25 ans" durationInFrames={75} premountFor={fps}>
          <Video src={MEDIA.debut} style={cover} volume={fades(75)} />
          <Captions items={SOUS_TITRES.debut} offset={48.7} />
        </Series.Sequence>
        <Series.Sequence name="Conseil" durationInFrames={222} premountFor={fps}>
          <Video src={MEDIA.conseil} style={cover} volume={fades(222)} />
          <Captions items={SOUS_TITRES.conseil} offset={136.05} />
        </Series.Sequence>

        {/* 3. Pourquoi le groupement : la proximité, le contact humain */}
        <Series.Sequence name="Proximité" durationInFrames={44} premountFor={fps}>
          <Video src={MEDIA.proximite} style={cover} volume={fades(44)} />
          <Captions items={SOUS_TITRES.proximite} offset={257.62} />
        </Series.Sequence>
        <Series.Sequence name="Contact humain" durationInFrames={81} premountFor={fps}>
          <Video src={MEDIA.humain} style={cover} volume={fades(81)} />
          {/* transition : fondu enchaîné sur les 12 dernières images vers Alexandra en plan serré */}
          <Sequence name="Fondu vers plan serré" from={69} durationInFrames={12} premountFor={fps}>
            <FonduPlanSerre duration={12}>
              <PlanSerre>
                <Video src={MEDIA.accompagne} muted style={cover} />
              </PlanSerre>
            </FonduPlanSerre>
          </Sequence>
          <Captions items={SOUS_TITRES.humain} offset={263.22} />
        </Series.Sequence>

        {/* 4. Plan serré : « on se sent vraiment accompagné », « esprit avant-gardiste » */}
        <Series.Sequence name="Accompagnée" durationInFrames={79} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.accompagne} trimBefore={12} style={cover} volume={fades(79)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.accompagne} offset={385.5} />
        </Series.Sequence>
        <Series.Sequence name="Avant-gardiste" durationInFrames={136} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.avantgarde} style={cover} volume={fades(136)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.avantgarde} offset={389.5} />
        </Series.Sequence>

        {/* 5. Remerciements (plan large) */}
        <Series.Sequence name="Merci" durationInFrames={89} premountFor={fps}>
          <Video src={MEDIA.merci} style={cover} volume={fades(89)} />
          <Captions items={SOUS_TITRES.merci} offset={412.4} />
        </Series.Sequence>
      </Series>

      {/* Bandeaux nom / fonction */}
      <Sequence name="Bandeau Loïc" from={30} durationInFrames={110}>
        <LowerThird {...PERSONNES.loic} duration={110} />
      </Sequence>
      <Sequence name="Bandeau Alexandra" from={DEBUT_INTERVIEW + 4} durationInFrames={150}>
        {/* au-dessus des têtes, devant le bas du tableau, pour ne pas couvrir les visages */}
        <LowerThird {...PERSONNES.alexandra} duration={150} top={690} />
      </Sequence>

      {/* Logo signature bleu en haut à droite (façade jaune puis mur clair de l'agence) */}
      <Sequence name="Logo signature" durationInFrames={FIN_START}>
        <LogoSignature duration={FIN_START} variante="bleu" />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <EcranFin nom={AGENCE.nom} villes={AGENCE.villes} tailleNom={74} />
      </Sequence>
    </AbsoluteFill>
  );
};
