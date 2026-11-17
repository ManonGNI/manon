import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio, Video } from "@remotion/media";
import { Captions, EcranFin, LogoSignature, LowerThird, TitreAgence } from "./Overlays";
import { MEDIA, PERSONNES, SOUS_TITRES } from "./theme";

const cover: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };

// Fondu de 4 images en entrée / sortie de chaque coupe pour éviter les clics audio
const fades = (duration: number) => (f: number) =>
  interpolate(f, [0, 4, duration - 4, duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Zoom avant sur Stephan (visage ≈ 28 % de la largeur, 43 % de la hauteur du cadre),
// déclenché à l'image `at` de la séquence, puis tenu jusqu'à la coupe
const ZoomStephan: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 1, 0.68, 1),
  });
  const scale = 1 + 0.55 * p;
  return (
    <AbsoluteFill
      style={{
        transformOrigin: "28% 43%",
        transform: `translate(${170 * p}px, ${-60 * p}px) scale(${scale})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Photo de face de l'agence : panoramique horizontal de l'enseigne SG vers le panneau GNI
const FacadePhoto: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.25, 1),
  });
  const left = interpolate(p, [0, 1], [600, 1772]);
  const scale = interpolate(p, [0, 1], [1.0, 1.04]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <Img
        src={MEDIA.facadePhoto}
        style={{
          position: "absolute",
          width: 3072,
          height: 2304,
          left: -left,
          top: -192,
          maxWidth: "none",
          transform: `scale(${scale})`,
          transformOrigin: `${left + 540}px 1152px`,
        }}
      />
    </AbsoluteFill>
  );
};

// Durées (images à 30 i/s)
const D = { intro: 393, miramas: 124, services: 222, cap: 200, fierte: 171, independant: 210, merci: 75, fin: 105 };
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
          <Sequence name="Façade" from={285} durationInFrames={108} premountFor={fps}>
            <FacadePhoto duration={108} />
            <TitreAgence duration={108} />
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

        {/* 4. Stephan : le passage sous licence, sur le gros plan de l'enseigne */}
        <Series.Sequence name="Interview licence" durationInFrames={200} premountFor={fps}>
          <Video src={MEDIA.interview} trimBefore={Math.round(30.55 * fps)} style={cover} volume={fades(200)} />
          <Sequence name="Enseigne" from={40} durationInFrames={146} premountFor={fps}>
            <Video src={MEDIA.enseigne} trimBefore={0} muted style={cover} />
          </Sequence>
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

      {/* Logo signature, masqué sur les plans façade et enseigne (déjà marqués, fond peu contrasté) */}
      <Sequence name="Logo signature 1" durationInFrames={285}>
        <LogoSignature duration={285} />
      </Sequence>
      <Sequence name="Logo signature 2" from={393} durationInFrames={386}>
        <LogoSignature duration={386} />
      </Sequence>
      <Sequence name="Logo signature 4" from={925} durationInFrames={FIN_START - 925}>
        <LogoSignature duration={FIN_START - 925} />
      </Sequence>

      <Sequence name="Écran de fin" from={FIN_START - 8} durationInFrames={D.fin + 8}>
        <EcranFin />
      </Sequence>

      {/* Musique légère sous les voix, remonte sur l'écran de fin */}
      <Audio
        src={MEDIA.musique}
        volume={(f) =>
          interpolate(f, [0, 15, FIN_START - 10, FIN_START + 10, 1500 - 30, 1500], [0, 0.13, 0.13, 0.6, 0.6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
  );
};
