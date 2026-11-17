import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio, Video } from "@remotion/media";
import { Captions, EcranFin, LogoSignature, LowerThird } from "./Overlays";
import { MEDIA, PERSONNES, SOUS_TITRES } from "./theme";

const cover: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };

// Fondu de 4 images en entrée / sortie de chaque coupe pour éviter les clics audio
const fades = (duration: number) => (f: number) =>
  interpolate(f, [0, 4, duration - 4, duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Zoom avant sur Stephan (visage ≈ 28 % de la largeur, 43 % de la hauteur du cadre),
// zoom doux sur 2 s à partir de l'image `at` de la séquence, puis tenu jusqu'à la coupe
const ZoomStephan: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.35, 1), // départ et arrivée en douceur
  });
  const scale = 1 + 0.35 * p;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: "28% 43%",
        transform: `translate(${95 * p}px, ${-35 * p}px) scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Durées (images à 30 i/s)
const D = { intro: 393, miramas: 124, services: 222, cap: 200, fierte: 171, independant: 210, merci: 75, fin: 135 };
const FIN_START = D.intro + D.miramas + D.services + D.cap + D.fierte + D.independant + D.merci; // 1395

export const AgenceMiramas: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Series>
        {/* 1. Nans présente le tournage, puis plan de façade qui finit sur l'enseigne GNI */}
        <Series.Sequence name="Intro Nans" durationInFrames={393} premountFor={fps}>
          <Video src={MEDIA.intro} trimBefore={0} style={cover} volume={fades(393)} />
          <Sequence name="Bandeau Nans" from={30} durationInFrames={110}>
            <LowerThird {...PERSONNES.nans} duration={110} />
          </Sequence>
          {/* gros plan vidéo sur l'enseigne (IMG_5065) : « Agence SG – Miramas » → « Conseil & Patrimoine » */}
          <Sequence name="Enseigne" from={285} durationInFrames={108} premountFor={fps}>
            <Video src={MEDIA.enseigne} trimBefore={Math.round(0.6 * fps)} muted style={cover} />
          </Sequence>
          <Captions items={SOUS_TITRES.intro} offset={0} />
        </Series.Sequence>

        {/* 2. Stephan : l'agence à Miramas */}
        <Series.Sequence name="Interview Miramas" durationInFrames={124} premountFor={fps}>
          <Video src={MEDIA.interview} trimBefore={Math.round(18.15 * fps)} style={cover} volume={fades(124)} />
          <Sequence name="Bandeau Stephan" from={4} durationInFrames={120}>
            <LowerThird {...PERSONNES.stephan} duration={120} />
          </Sequence>
          <Captions items={SOUS_TITRES.miramas} offset={18.15} />
        </Series.Sequence>

        {/* 3. Stephan : le métier de l'agence */}
        <Series.Sequence name="Interview services" durationInFrames={222} premountFor={fps}>
          <Video src={MEDIA.interview} trimBefore={Math.round(22.85 * fps)} style={cover} volume={fades(222)} />
          <Captions items={SOUS_TITRES.services} offset={22.85} />
        </Series.Sequence>

        {/* 4. Stephan : le passage sous licence */}
        <Series.Sequence name="Interview licence" durationInFrames={200} premountFor={fps}>
          <Video src={MEDIA.interview} trimBefore={Math.round(30.55 * fps)} style={cover} volume={fades(200)} />
          <Captions items={SOUS_TITRES.cap} offset={30.55} />
        </Series.Sequence>

        {/* 5. Conclusion : la fierté */}
        <Series.Sequence name="Fierté" durationInFrames={171} premountFor={fps}>
          {/* zoom avant unique sur « Une véritable fierté… », tenu jusqu'à la fin de sa réponse */}
          <ZoomStephan at={2}>
            <Video src={MEDIA.conclusion} trimBefore={Math.round(3.85 * fps)} style={cover} volume={fades(171)} />
          </ZoomStephan>
          <Captions items={SOUS_TITRES.fierte} offset={3.85} />
        </Series.Sequence>

        <Series.Sequence name="Indépendant" durationInFrames={210} premountFor={fps}>
          {/* suite de la réponse : le zoom reste tenu */}
          <ZoomStephan at={-100}>
            <Video src={MEDIA.conclusion} trimBefore={Math.round(10.6 * fps)} style={cover} volume={fades(210)} />
          </ZoomStephan>
          <Captions items={SOUS_TITRES.independant} offset={10.6} />
        </Series.Sequence>

        {/* 6. Remerciements et poignée de main */}
        <Series.Sequence name="Merci" durationInFrames={75} premountFor={fps}>
          <Video src={MEDIA.conclusion} trimBefore={Math.round(23.25 * fps)} style={cover} volume={fades(75)} />
          <Captions items={SOUS_TITRES.merci} offset={23.25} />
        </Series.Sequence>
      </Series>

      {/* Logo signature, masqué sur le gros plan de l'enseigne (fond bleu peu contrasté) */}
      <Sequence name="Logo signature 1" durationInFrames={285}>
        <LogoSignature duration={285} />
      </Sequence>
      <Sequence name="Logo signature 2" from={393} durationInFrames={FIN_START - 393}>
        <LogoSignature duration={FIN_START - 393} />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <EcranFin />
      </Sequence>

      {/* Musique légère sous les voix, remonte sur l'écran de fin */}
      <Audio
        src={MEDIA.musique}
        volume={(f) =>
          interpolate(f, [0, 15, FIN_START - 10, FIN_START + 10, 1530 - 30, 1530], [0, 0.13, 0.13, 0.6, 0.6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
  );
};
