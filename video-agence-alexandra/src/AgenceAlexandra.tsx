import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions, EcranFin, LogoSignature, LowerThird } from "./Overlays";
import { AGENCE, MEDIA, PERSONNES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

// Durées (images à 30 i/s)
const D = { intro: 454, debut: 75, conseil: 222, technologie: 287, google: 49, journee: 130, merci: 89, fin: 135 };
const DEBUT_INTERVIEW = D.intro;
const FIN_START = D.intro + D.debut + D.conseil + D.technologie + D.google + D.journee + D.merci; // 1306
export const DUREE_TOTALE = FIN_START + D.fin; // 1441

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

        {/* 2. Alexandra : son parcours et sa vision du conseil (plan large) */}
        <Series.Sequence name="25 ans" durationInFrames={75} premountFor={fps}>
          <Video src={MEDIA.debut} style={cover} volume={fades(75)} />
          <Captions items={SOUS_TITRES.debut} offset={48.7} />
        </Series.Sequence>
        <Series.Sequence name="Conseil" durationInFrames={222} premountFor={fps}>
          <Video src={MEDIA.conseil} style={cover} volume={fades(222)} />
          <Captions items={SOUS_TITRES.conseil} offset={136.05} />
        </Series.Sequence>

        {/* 3. L'humain face à la technologie (plan large), fondu vers le plan serré */}
        <Series.Sequence name="Technologie" durationInFrames={287} premountFor={fps}>
          <Video src={MEDIA.technologie} style={cover} volume={fades(287)} />
          <Sequence name="Fondu vers plan serré" from={275} durationInFrames={12} premountFor={fps}>
            <FonduPlanSerre duration={12}>
              <PlanSerre>
                <Video src={MEDIA.google} muted style={cover} />
              </PlanSerre>
            </FonduPlanSerre>
          </Sequence>
          <Captions items={SOUS_TITRES.technologie} offset={150.28} />
        </Series.Sequence>

        {/* 4. Plan serré : « avec Google, l'IA », puis le quotidien du métier */}
        <Series.Sequence name="Google, l'IA" durationInFrames={49} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.google} trimBefore={12} style={cover} volume={fades(49)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.google} offset={161.0} />
        </Series.Sequence>
        <Series.Sequence name="Journée" durationInFrames={130} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.journee} style={cover} volume={fades(130)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.journee} offset={179.35} />
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
