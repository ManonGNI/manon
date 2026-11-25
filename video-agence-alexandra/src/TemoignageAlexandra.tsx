import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { AccrocheXXL, Captions, EcranFinGroupementIvoire, LogoSignature, BandeauSignature } from "./Overlays";
import { GROUPEMENT, MEDIA, SIGNATURES, SOUS_TITRES } from "./theme";
import { cover, fades, FonduPlanSerre, PlanSerre } from "./montage";
import { MotCle, Reseau } from "./MotionDesign";

// Image figée avec un zoom très lent (1 → 1,03)
const ArretSurImage: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 26], [1, 1.03], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <Img src={src} style={{ ...cover, position: "absolute", transform: `scale(${s})` }} />;
};

// Vidéo 2 — témoignage : « Pourquoi rejoindre un groupement ? »
// Durées (images à 30 i/s)
const D = { accroche: 172, qGroupement: 36, proximite: 250, communaute: 371, finEchange: 555, fin: 135 };
const FIN_START = D.accroche + D.qGroupement + D.proximite + D.communaute + D.finEchange; // 1384
export const DUREE_TEMOIGNAGE = FIN_START + D.fin; // 1519

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

        {/* 3. Plan large, d'un seul tenant : la proximité, le contact humain */}
        <Series.Sequence name="Proximité" durationInFrames={250} premountFor={fps}>
          <Video src={MEDIA.proximiteSuite} style={cover} volume={fades(250)} />
          <Captions items={SOUS_TITRES.proximiteSuite} offset={257.62} />
        </Series.Sequence>

        {/* 4. Être en communauté, d'un seul tenant : plan serré puis plan large (même prise, son continu) */}
        <Series.Sequence name="Communauté" durationInFrames={371} premountFor={fps}>
          <Video src={MEDIA.communaute} style={cover} volume={fades(371)} />
          <Sequence name="Plan serré (même prise)" durationInFrames={140} premountFor={fps}>
            <PlanSerre>
              <Video src={MEDIA.communaute} muted style={cover} />
            </PlanSerre>
          </Sequence>
          <Captions items={SOUS_TITRES.communaute} offset={299.1} />
        </Series.Sequence>

        {/* 5. D'un seul tenant jusqu'à la fin : « accompagnée… on n'a pas le temps »
             puis la réponse de Loïc « on est là pour ça… accompagner nos agences » ; arrêt sur image
             à la fin de sa phrase, et l'écran de fin arrive en fondu */}
        <Series.Sequence name="Fin de l'échange" durationInFrames={555} premountFor={fps}>
          <Sequence name="Vidéo jusqu'à « nos agences »" durationInFrames={530} premountFor={fps}>
            <Video src={MEDIA.accompagneFin} style={cover} volume={fades(530)} />
          </Sequence>
          {/* même prise, son continu : Alexandra en plan serré pendant ses phrases, plan large sur « C'est gentil » et la réponse de Loïc */}
          <Sequence name="Serré : accompagnée" durationInFrames={80} premountFor={fps}>
            <PlanSerre>
              <Video src={MEDIA.accompagneFin} muted style={cover} />
            </PlanSerre>
          </Sequence>
          <Sequence name="Serré : avant-gardiste… pas le temps" from={122} durationInFrames={253} premountFor={fps}>
            <PlanSerre>
              <Video src={MEDIA.accompagneFin} trimBefore={122} muted style={cover} />
            </PlanSerre>
          </Sequence>
          {/* arrêt sur image à la fin de sa phrase (pas de lèvres qui bougent sans son), léger zoom */}
          <Sequence name="Arrêt sur image" from={529} durationInFrames={26}>
            <ArretSurImage src={MEDIA.arretFin} />
          </Sequence>
          <Captions items={[...SOUS_TITRES.accompagneSuite, ...SOUS_TITRES.loicTemps]} offset={385.5} />
        </Series.Sequence>
      </Series>

      {/* ===== Motion design sur les informations clés ===== */}
      {/* « ce n'est plus d'actualité » : un point or seul = l'agence isolée */}
      <Sequence name="MD : isolée" from={100} durationInFrames={72}>
        <Reseau mode="isolee" texte="Seule dans son coin ?" duration={72} />
      </Sequence>
      {/* la proximité, le contact humain */}
      <Sequence name="MD : Proximité" from={219} durationInFrames={110}>
        <MotCle texte="Proximité" duration={110} top={150} />
      </Sequence>
      <Sequence name="MD : Contact humain" from={405} durationInFrames={53}>
        <MotCle texte="Contact humain" duration={53} top={300} cote="droite" />
      </Sequence>
      {/* « être en communauté » : les points se relient en réseau */}
      <Sequence name="MD : réseau" from={640} durationInFrames={189}>
        <Reseau mode="reseau" texte="Ensemble, en réseau" duration={189} />
      </Sequence>
      {/* accompagnée, avant-gardiste */}
      <Sequence name="MD : Accompagnée" from={892} durationInFrames={100}>
        <MotCle texte="Accompagnée" duration={100} top={150} />
      </Sequence>
      <Sequence name="MD : Avant-gardiste" from={1004} durationInFrames={110}>
        <MotCle texte="Avant-gardiste" duration={110} top={300} cote="droite" />
      </Sequence>

      {/* Accroche typographique XXL en haut, puis bandeau d'Alexandra (sur le buste, plan serré) */}
      <Sequence name="Titre accroche" durationInFrames={95}>
        <AccrocheXXL
          lignes={[[["Pourquoi"]], [["Alexandra a rejoint"]], [["notre Groupe", true], [" ?"]]]}
          mention="Rencontre avec Alexandra · 2/2"
          duration={95}
        />
      </Sequence>
      <Sequence name="Bandeau Alexandra" from={88} durationInFrames={84}>
        <BandeauSignature {...SIGNATURES.alexandra} duration={84} />
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
