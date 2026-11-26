import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

// Rubrique « Portrait d'agence » — mêmes codes graphiques que les vidéos de la série
// (ouverture, bandeau nom, fiches d'information, écran de fin). Montserrat, marine, or.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const MARINE_FONCE = "#1B2C42";
const OMBRE_TEXTE = "0 2px 10px rgba(0,0,0,0.45)";

const usePop = (delai = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delai, fps, config: { damping: 13, stiffness: 190, mass: 0.6 } });
};
const useSortie = (duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [duration - 8, duration], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
};

// ---------- Ouverture : fond marine dégradé, photo dans un cadre arrondi liseré or, titre centré ----------
export const OuverturePortrait: React.FC<{ photo: string; surtitre: string; titre: string; sousTitre: string; duration: number }> = ({
  photo,
  surtitre,
  titre,
  sousTitre,
  duration,
}) => {
  const frame = useCurrentFrame();
  const carte = usePop(0);
  const texte = (d: number): React.CSSProperties => {
    const p = interpolate(frame, [d, d + 12], [0, 1], { ...clamp, easing: ease });
    return { opacity: p, transform: `translateY(${(1 - p) * 20}px)` };
  };
  const filet = interpolate(frame, [14, 30], [0, 1], { ...clamp, easing: ease });
  const sortie = interpolate(frame, [duration - 8, duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.marine} 0%, ${MARINE_FONCE} 100%)`, opacity: sortie }}>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 190,
          width: 700,
          height: 700,
          borderRadius: 34,
          border: `5px solid ${C.or}`,
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          transform: `scale(${0.85 + 0.15 * Math.min(carte, 1.03)})`,
          opacity: Math.min(1, carte * 1.5),
        }}
      >
        <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.08 - 0.04 * interpolate(frame, [0, duration], [0, 1], clamp)})` }} />
      </div>
      <div style={{ position: "absolute", top: 1110, width: "100%", textAlign: "center", fontFamily: FONT, color: C.blanc }}>
        <div style={{ fontWeight: 700, fontSize: 38, letterSpacing: 8, color: C.or, ...texte(6) }}>{surtitre}</div>
        <div style={{ fontWeight: 800, fontSize: 124, letterSpacing: -2, lineHeight: 1.1, marginTop: 8, ...texte(10) }}>{titre}</div>
        <div style={{ width: 560 * filet, height: 3, background: C.or, margin: "18px auto 22px" }} />
        <div style={{ fontWeight: 600, fontSize: 38, ...texte(16) }}>{sousTitre}</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Bandeau nom : filet or vertical, prénom blanc + NOM or sur bloc marine, structure sur barre blanche ----------
export const BandeauRubrique: React.FC<{ prenom: string; nom: string; structure: string; duration: number; top?: number }> = ({
  prenom,
  nom,
  structure,
  duration,
  top = 1010, // au-dessus des sous-titres
}) => {
  const frame = useCurrentFrame();
  const filet = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: ease });
  const bloc = interpolate(frame, [4, 16], [0, 1], { ...clamp, easing: ease });
  const barre = interpolate(frame, [10, 22], [0, 1], { ...clamp, easing: ease });
  const s = useSortie(duration);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - s }}>
      <div style={{ position: "absolute", left: 70, top, transform: `translateX(${-s * 50}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 7, height: 250, background: C.or, transform: `scaleY(${filet})`, transformOrigin: "top" }} />
        <div
          style={{
            marginLeft: 26,
            background: C.marine,
            padding: "16px 36px 18px 30px",
            width: "fit-content",
            clipPath: `inset(0 ${(1 - bloc) * 100}% 0 0)`,
          }}
        >
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 46, color: C.blanc, lineHeight: 1.1 }}>{prenom}</div>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.or, lineHeight: 1.05, textTransform: "uppercase" }}>{nom}</div>
        </div>
        <div
          style={{
            marginLeft: 26,
            marginTop: 12,
            background: C.blanc,
            padding: "8px 18px 10px",
            width: "fit-content",
            clipPath: `inset(0 ${(1 - barre) * 100}% 0 0)`,
          }}
        >
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: C.marine, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>
            {structure}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PastilleOr: React.FC<{ texte: string; taille?: number }> = ({ texte, taille = 74 }) => (
  <div
    style={{
      background: C.or,
      borderRadius: 16,
      padding: "4px 26px 8px",
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: taille,
      lineHeight: 1.1,
      color: C.marine,
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    }}
  >
    {texte}
  </div>
);
const PastilleMarine: React.FC<{ texte: string }> = ({ texte }) => (
  <div
    style={{
      background: C.marine,
      borderRadius: 12,
      padding: "8px 22px 10px",
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 34,
      color: C.blanc,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      textAlign: "center",
    }}
  >
    {texte}
  </div>
);

// ---------- Fiche chiffre : nombre dans une pastille or + libellé dans une pastille marine (haut, centré) ----------
export const FicheChiffre: React.FC<{ valeur: number; libelle: string; duration: number; top?: number }> = ({ valeur, libelle, duration, top = 150 }) => {
  const frame = useCurrentFrame();
  const p1 = usePop(0);
  const p2 = usePop(6);
  const s = useSortie(duration);
  const n = Math.round(interpolate(frame, [0, 18], [0, valeur], { ...clamp, easing: Easing.out(Easing.cubic) }));
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - s }}>
      <div style={{ position: "absolute", top, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ transform: `scale(${Math.max(0, p1)})` }}>
          <PastilleOr texte={String(n)} />
        </div>
        <div style={{ transform: `scale(${Math.max(0, p2)})` }}>
          <PastilleMarine texte={libelle} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fiche numérotée : « #1 » pastille or + raison en pastille marine (+ étiquettes optionnelles) ----------
export const FicheNumero: React.FC<{ numero: number; libelle: string; etiquettes?: [string, number][]; duration: number; top?: number }> = ({
  numero,
  libelle,
  etiquettes = [],
  duration,
  top = 150,
}) => {
  const p1 = usePop(0);
  const p2 = usePop(6);
  const s = useSortie(duration);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - s }}>
      <div style={{ position: "absolute", top, left: 70, right: 70, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ transform: `scale(${Math.max(0, p1)})` }}>
          <PastilleOr texte={`#${numero}`} taille={64} />
        </div>
        <div style={{ transform: `scale(${Math.max(0, p2)})` }}>
          <PastilleMarine texte={libelle} />
        </div>
        <Etiquettes items={etiquettes} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- Fiche étiquettes : titre blanc + étiquettes marine liserées d'or qui apparaissent une à une ----------
const Etiquettes: React.FC<{ items: [string, number][] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 4 }}>
      {items.map(([t, d], i) => {
        const p = spring({ frame: frame - d, fps, config: { damping: 13, stiffness: 200, mass: 0.5 } });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              transform: `scale(${Math.max(0, p)})`,
              boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div style={{ width: 7, background: C.or }} />
            <div style={{ background: C.marine, padding: "8px 20px 10px 16px", fontFamily: FONT, fontWeight: 700, fontSize: 34, color: C.blanc }}>{t}</div>
          </div>
        );
      })}
    </div>
  );
};
export const FicheEtiquettes: React.FC<{ titre: string; items: [string, number][]; duration: number; top?: number }> = ({
  titre,
  items,
  duration,
  top = 150,
}) => {
  const p = usePop(0);
  const s = useSortie(duration);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - s }}>
      <div style={{ position: "absolute", top, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 46,
            color: C.blanc,
            textTransform: "uppercase",
            textShadow: OMBRE_TEXTE,
            WebkitTextStroke: "1px rgba(0,0,0,0.25)",
            transform: `scale(${Math.max(0, p)})`,
          }}
        >
          {titre}
        </div>
        <Etiquettes items={items} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- Écran de fin : photo en transparence sous un voile marine, texte centré ----------
export const FinRubrique: React.FC<{ photo: string; surtitre: string; titre: string; sousTitre: string }> = ({ photo, surtitre, titre, sousTitre }) => {
  const frame = useCurrentFrame();
  const fond = interpolate(frame, [0, 12], [0, 1], clamp);
  const texte = (d: number): React.CSSProperties => {
    const p = interpolate(frame, [d, d + 14], [0, 1], { ...clamp, easing: ease });
    return { opacity: p, transform: `translateY(${(1 - p) * 22}px)` };
  };
  const filet = interpolate(frame, [22, 40], [0, 1], { ...clamp, easing: ease });
  return (
    <AbsoluteFill style={{ opacity: fond, background: C.marine }}>
      <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18, filter: "grayscale(0.3)", transform: `scale(${1.05 + 0.03 * fond})` }} />
      <AbsoluteFill style={{ background: "rgba(43,66,88,0.55)" }} />
      <div style={{ position: "absolute", top: 760, left: 90, right: 90, textAlign: "center", fontFamily: FONT, color: C.blanc }}>
        <div style={{ fontWeight: 700, fontSize: 34, letterSpacing: 6, color: C.or, lineHeight: 1.45, textTransform: "uppercase", ...texte(8) }}>{surtitre}</div>
        <div style={{ fontWeight: 800, fontSize: 116, letterSpacing: -2, lineHeight: 1.08, marginTop: 16, ...texte(14) }}>{titre}</div>
        <div style={{ width: 380 * filet, height: 4, background: C.or, margin: "26px auto 26px" }} />
        <div style={{ fontWeight: 500, fontSize: 38, ...texte(22) }}>{sousTitre}</div>
      </div>
    </AbsoluteFill>
  );
};
