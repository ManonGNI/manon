import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { Captions } from "./Overlays";
import { BandeauRubrique, FicheChiffre, FicheEtiquettes, FinRubrique, OuverturePortrait } from "./Rubrique";
import { BANDEAUX, MEDIA, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";

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

      {/* Ouverture « Portrait d'agence » (le son de Loïc continue dessous) */}
      <Sequence name="Ouverture" durationInFrames={80}>
        <OuverturePortrait
          photo={MEDIA.facadeAlexandra}
          surtitre="PORTRAIT D’AGENCE"
          titre="Alexandra"
          sousTitreNom="L’Immobilier en Provence"
          sousTitre="Agence partenaire · Vaucluse"
          duration={80}
        />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <FinRubrique
          photo={MEDIA.facadeAlexandra}
          surtitre="Agence partenaire du Groupe National Immobilier"
          titre="Alexandra"
          sousTitre="L’Immobilier en Provence · Vaucluse"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
