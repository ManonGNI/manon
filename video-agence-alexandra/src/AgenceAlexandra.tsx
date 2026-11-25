import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { AccrocheXXL, Captions, EcranFinPartenaire, LogoSignature, LowerThird } from "./Overlays";
import { MEDIA, PERSONNES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";
import { ChiffreCle, DeuxAgences, MotCle } from "./MotionDesign";

// Vidéo 1 — Bienvenue à l'agence : Alexandra, son parcours et sa vision du métier
// Durées (images à 30 i/s)
const D = {
  intro: 381,
  qDebut: 49,
  debut: 264,
  qVibrer: 45,
  service: 66,
  ecouter: 154,
  technologie: 287,
  google: 49,
  loicConclusion: 133,
  merciFinal: 119,
  fin: 135,
};
const FIN_START =
  D.intro + D.qDebut + D.debut + D.qVibrer + D.service + D.ecouter + D.technologie + D.google + D.loicConclusion + D.merciFinal; // 1547
export const DUREE_TOTALE = FIN_START + D.fin; // 1682

export const AgenceAlexandra: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        {/* 1. Loïc présente l'agence, devant la façade (intro raccourcie) */}
        <Series.Sequence name="Intro Loïc" durationInFrames={381} premountFor={fps}>
          <Video src={MEDIA.introCourt} style={cover} volume={fades(381)} />
          <Captions items={SOUS_TITRES.introCourt} offset={10.04} />
        </Series.Sequence>

        {/* 2. Loïc : « Comment vous avez commencé l'immobilier ? » → Alexandra (plan serré) : 25 ans, négociatrice */}
        <Series.Sequence name="Question : débuts" durationInFrames={49} premountFor={fps}>
          <PlanSerre sur="loic">
            <Video src={MEDIA.questionDebut} style={cover} volume={fades(49)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.qDebut} offset={43.4} />
        </Series.Sequence>
        <Series.Sequence name="25 ans" durationInFrames={264} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.debutLong} style={cover} volume={fades(264)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.debutLong} offset={48.7} />
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
          {/* fondu enchaîné : les deux plans serrés se suivent, on évite le saut d'image */}
          <Sequence name="Fondu enchaîné" from={54} durationInFrames={12} premountFor={fps}>
            <FonduPlanSerre duration={12} zoom={false}>
              <PlanSerre>
                <Video src={MEDIA.ecouter} muted style={cover} />
              </PlanSerre>
            </FonduPlanSerre>
          </Sequence>
          <Captions items={SOUS_TITRES.service} offset={89.45} />
        </Series.Sequence>
        <Series.Sequence name="Écouter le projet" durationInFrames={154} premountFor={fps}>
          <PlanSerre>
            <Video src={MEDIA.ecouter} trimBefore={12} style={cover} volume={fades(154)} />
          </PlanSerre>
          <Captions items={SOUS_TITRES.ecouter} offset={122.95} />
        </Series.Sequence>

        {/* 4. L'humain face à la technologie : plan large, puis plan serré en cours de phrase */}
        <Series.Sequence name="Technologie" durationInFrames={287} premountFor={fps}>
          <Video src={MEDIA.technologie} style={cover} volume={fades(287)} />
          {/* changement de cadrage sans couper le son : plan serré sur Alexandra en cours de phrase */}
          <Sequence name="Plan serré (même prise)" from={140} durationInFrames={135} premountFor={fps}>
            <PlanSerre>
              <Video src={MEDIA.technologie} trimBefore={140} muted style={cover} />
            </PlanSerre>
          </Sequence>
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

      {/* Accroche XXL d'ouverture + mention de série */}
      <Sequence name="Accroche" durationInFrames={105}>
        <AccrocheXXL
          lignes={[[["Bienvenue à"]], [["Alexandra", true]], [["l’Immobilier"]], [["en Provence"]]]}
          mention="Rencontre avec Alexandra · 1/2"
          duration={105}
        />
      </Sequence>

      {/* ===== Motion design sur les informations clés ===== */}
      {/* « deux agences » (Loïc, 18,86 s) puis les villes quand il les nomme */}
      <Sequence name="MD : 2 agences" from={262} durationInFrames={119}>
        <DeuxAgences villes={[["Pernes-les-Fontaines", 42], ["Beaumes-de-Venise", 92]]} duration={119} top={560} />
      </Sequence>
      {/* « il y a 25 ans » : compteur */}
      <Sequence name="MD : 25 ans" from={470} durationInFrames={110}>
        <ChiffreCle valeur={25} unite="ans" legende="dans l’immobilier" duration={110} />
      </Sequence>
      {/* « 16 ans négociatrice » */}
      <Sequence name="MD : 16 ans" from={584} durationInFrames={108}>
        <ChiffreCle valeur={16} unite="ans" legende="négociatrice VRP" duration={108} />
      </Sequence>
      {/* « le service et le conseil » */}
      <Sequence name="MD : Service" from={745} durationInFrames={60}>
        <MotCle texte="Service" duration={60} top={170} />
      </Sequence>
      <Sequence name="MD : Conseil" from={766} durationInFrames={84}>
        <MotCle texte="Conseil" duration={84} top={290} />
      </Sequence>
      {/* « savoir écouter le projet du client » */}
      <Sequence name="MD : Écoute" from={888} durationInFrames={70}>
        <MotCle texte="À l’écoute" sousTexte="du projet client" duration={70} top={170} />
      </Sequence>
      {/* « renforcer ce lien-là » face à la technologie */}
      <Sequence name="MD : Lien humain" from={1052} durationInFrames={140}>
        <MotCle texte="Le lien humain" sousTexte="face à la technologie" duration={140} top={170} />
      </Sequence>
      <Sequence name="MD : Google IA" from={1258} durationInFrames={40}>
        <MotCle texte="Google · IA" duration={40} top={300} cote="droite" />
      </Sequence>
      {/* Loïc : « main dans la main » */}
      <Sequence name="MD : Main dans la main" from={1336} durationInFrames={92}>
        <MotCle texte="Main dans la main" duration={92} top={300} cote="droite" />
      </Sequence>

      {/* Bandeaux nom / fonction */}
      <Sequence name="Bandeau Loïc" from={100} durationInFrames={110}>
        <LowerThird {...PERSONNES.loic} duration={110} />
      </Sequence>
      {/* Alexandra : dès sa première réponse (plan serré), bandeau sur le buste */}
      <Sequence name="Bandeau Alexandra" from={D.intro + D.qDebut + 6} durationInFrames={150}>
        <LowerThird {...PERSONNES.alexandra} duration={150} />
      </Sequence>

      {/* Logo signature bleu en haut à droite, à partir de l'interview (peu lisible sur la façade) */}
      <Sequence name="Logo signature" from={D.intro} durationInFrames={FIN_START - D.intro}>
        <LogoSignature duration={FIN_START - D.intro} variante="bleu" />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <EcranFinPartenaire variante="ivoire" logoAgence={MEDIA.logoAlexandra} ratioLogo={1082 / 785} />
      </Sequence>
    </AbsoluteFill>
  );
};
