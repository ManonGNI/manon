import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions } from "./Overlays";
import { BandeauRubrique, FicheChiffre, FicheEtiquettes, FinRubrique, OuvertureTemoignage } from "./Rubrique";
import { BANDEAUX, MEDIA, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

// Photo plein cadre avec un zoom lent vers l'agence
const PhotoLente: React.FC<{ src: string; duration: number }> = ({ src, duration }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [0, duration], [1.0, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <Img src={src} style={{ ...cover, position: "absolute", transformOrigin: "50% 48%", transform: `scale(${z})` }} />;
};

// Zoom lent appliqué à une vidéo d'arrière-plan
const ZoomLent: React.FC<{ duration: number; children: React.ReactNode }> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [0, duration], [1.0, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ transformOrigin: "50% 45%", transform: `scale(${z})` }}>{children}</AbsoluteFill>;
};

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
const OUVERTURE = 120; // ouverture « Portrait d'agence » (4 s)
export const DUREE_TOTALE = OUVERTURE + FIN_START + D.fin; // 1802

export const AgenceAlexandra: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Ouverture : la devanture de l'agence (début du rush de Loïc) sous un voile marine, sigle GNI, titre lumineux, pastilles de lieu */}
      <Sequence name="Ouverture" durationInFrames={OUVERTURE}>
        <OuvertureTemoignage
          video={
            <ZoomLent duration={OUVERTURE}>
              <Video src={MEDIA.ouvertureDevanture} muted style={cover} />
            </ZoomLent>
          }
          titre="Portrait|d’agence"
          sousTitre={["Alexandra · L’Immobilier en Provence"]}
          lieu={["Pernes-les-Fontaines", "Beaumes-de-Venise"]}
          decalage={-80}
          duration={OUVERTURE}
        />
      </Sequence>

      {/* Le portrait, après l'ouverture */}
      <Sequence name="Portrait" from={OUVERTURE} durationInFrames={FIN_START + D.fin}>
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
            <Sequence name="Plan serré (même prise)" from={140} durationInFrames={147} premountFor={fps}>
              <PlanSerre>
                <Video src={MEDIA.technologie} trimBefore={140} muted style={cover} />
              </PlanSerre>
            </Sequence>
            <Sequence name="Fondu vers plan serré" from={275} durationInFrames={12} premountFor={fps}>
              <FonduPlanSerre duration={12} zoom={false}>
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
        {/* ===== Rubrique « Portrait d'agence » ===== */}
        {/* Fiches d'information (haut, centré) */}
        <Sequence name="Fiche : 2 agences" from={262} durationInFrames={42}>
          <FicheChiffre valeur={2} libelle="agences" duration={42} />
        </Sequence>
        <Sequence name="Fiche : implantations" from={300} durationInFrames={81}>
          <FicheEtiquettes titre="Implantations" items={[["Pernes-les-Fontaines", 6], ["Beaumes-de-Venise", 56]]} duration={81} />
        </Sequence>
        <Sequence name="Fiche : 25 ans" from={470} durationInFrames={110}>
          <FicheChiffre valeur={25} libelle="ans d’immobilier" duration={110} />
        </Sequence>
        <Sequence name="Fiche : 16 ans" from={584} durationInFrames={108}>
          <FicheChiffre valeur={16} libelle="ans négociatrice VRP" duration={108} />
        </Sequence>
        <Sequence name="Fiche : valeurs" from={745} durationInFrames={205}>
          <FicheEtiquettes titre="Ses valeurs" items={[["Service", 0], ["Conseil", 21], ["Écoute du client", 143]]} duration={205} />
        </Sequence>
        <Sequence name="Fiche : lien humain" from={1052} durationInFrames={190}>
          <FicheEtiquettes titre="Sa vision" items={[["Le lien humain", 0], ["face à la technologie", 140]]} duration={190} />
        </Sequence>
        <Sequence name="Fiche : main dans la main" from={1336} durationInFrames={92}>
          <FicheEtiquettes titre="L’esprit du Groupe" items={[["Main dans la main", 0]]} duration={92} />
        </Sequence>

        {/* Bandeaux nom */}
        <Sequence name="Bandeau Loïc" from={82} durationInFrames={110}>
          <BandeauRubrique {...BANDEAUX.loic} duration={110} />
        </Sequence>
        <Sequence name="Bandeau Alexandra" from={D.intro + D.qDebut + 6} durationInFrames={150}>
          <BandeauRubrique {...BANDEAUX.alexandra} duration={150} />
        </Sequence>

        <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
          <FinRubrique
            photo={MEDIA.facadeAlexandra}
            surtitre="Agence partenaire"
            titre="Alexandra"
            logoAgence={MEDIA.logoAlexandraBlanc}
            sousTitre="Bienvenue parmi nous"
            sousTitreManuscrit
            logoHaut
          />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
