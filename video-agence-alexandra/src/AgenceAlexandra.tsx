import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions, EcranFinPartenaire, LogoSignature, LowerThird } from "./Overlays";
import { MEDIA, PERSONNES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

// Vidéo 1 — Bienvenue à l'agence : Alexandra, son parcours et sa vision du métier
// Durées (images à 30 i/s)
const D = {
  intro: 454,
  qDebut: 49,
  debut: 75,
  qVibrer: 45,
  service: 66,
  ecouter: 154,
  technologie: 287,
  google: 49,
  loicConclusion: 133,
  merciFinal: 119,
  fin: 135,
};
const DEBUT_SERVICE = D.intro + D.qDebut + D.debut + D.qVibrer; // 623
const FIN_START =
  D.intro + D.qDebut + D.debut + D.qVibrer + D.service + D.ecouter + D.technologie + D.google + D.loicConclusion + D.merciFinal; // 1431
export const DUREE_TOTALE = FIN_START + D.fin; // 1566

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

        {/* 2. Loïc : « Comment vous avez commencé l'immobilier ? » → Alexandra : 25 ans */}
        <Series.Sequence name="Question : débuts" durationInFrames={49} premountFor={fps}>
          <PlanSerre sur="loic">
            <Video src={MEDIA.questionDebut} style={cover} volume={fades(49)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.qDebut} offset={43.4} />
        </Series.Sequence>
        <Series.Sequence name="25 ans" durationInFrames={75} premountFor={fps}>
          <Video src={MEDIA.debut} style={cover} volume={fades(75)} />
          <Captions items={SOUS_TITRES.debut} offset={48.7} />
        </Series.Sequence>

        {/* 3. Loïc : « Qu'est-ce qui vous fait vibrer ? » → Alexandra : le service, le conseil, l'écoute */}
        <Series.Sequence name="Question : vibrer" durationInFrames={45} premountFor={fps}>
          <PlanSerre sur="loic">
            <Video src={MEDIA.questionVibrer} style={cover} volume={fades(45)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.qVibrer} offset={46.58} />
        </Series.Sequence>
        <Series.Sequence name="Service et conseil" durationInFrames={66} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.service} style={cover} volume={fades(66)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.service} offset={89.45} />
        </Series.Sequence>
        <Series.Sequence name="Écouter le projet" durationInFrames={154} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.ecouter} style={cover} volume={fades(154)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.ecouter} offset={122.95} />
        </Series.Sequence>

        {/* 4. L'humain face à la technologie (plan large), fondu vers le plan serré */}
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
        <Series.Sequence name="Google, l'IA" durationInFrames={49} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.google} trimBefore={12} style={cover} volume={fades(49)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.google} offset={161.0} />
        </Series.Sequence>

        {/* 5. Conclusion de Loïc (plan serré), puis remerciements (plan large) */}
        <Series.Sequence name="Conclusion Loïc" durationInFrames={133} premountFor={fps}>
          <PlanSerre sur="loic">
            <Video src={MEDIA.loicConclusion} style={cover} volume={fades(133)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.loicConclusion} offset={403.15} />
        </Series.Sequence>
        <Series.Sequence name="Merci" durationInFrames={119} premountFor={fps}>
          <Video src={MEDIA.merciFinal} style={cover} volume={fades(119)} />
          <Captions items={SOUS_TITRES.merciFinal} offset={411.4} />
        </Series.Sequence>
      </Series>

      {/* Bandeaux nom / fonction */}
      <Sequence name="Bandeau Loïc" from={30} durationInFrames={110}>
        <LowerThird {...PERSONNES.loic} duration={110} />
      </Sequence>
      {/* Alexandra : sur son premier plan serré, bandeau sur le buste (visage dégagé) */}
      <Sequence name="Bandeau Alexandra" from={DEBUT_SERVICE + 4} durationInFrames={150}>
        <LowerThird {...PERSONNES.alexandra} duration={150} />
      </Sequence>

      {/* Logo signature bleu en haut à droite */}
      <Sequence name="Logo signature" durationInFrames={FIN_START}>
        <LogoSignature duration={FIN_START} variante="bleu" />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <EcranFinPartenaire variante="ivoire" logoAgence={MEDIA.logoAlexandra} ratioLogo={1082 / 785} />
      </Sequence>
    </AbsoluteFill>
  );
};
