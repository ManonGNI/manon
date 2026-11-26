import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MEDIA } from "./theme";
import { SIGLE } from "./sigle";

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
// Ligne de texte étirée lettre à lettre sur toute la largeur de son conteneur
const LigneJustifiee: React.FC<{ texte: string; style: React.CSSProperties }> = ({ texte, style }) => (
  <div style={{ display: "flex", justifyContent: "space-between", ...style }}>
    {Array.from(texte).map((c, i) => (
      <span key={i}>{c === " " ? "\u00a0" : c}</span>
    ))}
  </div>
);

export const OuverturePortrait: React.FC<{
  photo: string;
  surtitre: string;
  titre: string;
  sousTitre: string;
  duration: number;
  sousTitreNom?: string; // petite ligne sous le titre, de la même largeur que le mot
}> = ({ photo, surtitre, titre, sousTitre, duration, sousTitreNom }) => {
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
        <div style={{ display: "inline-block", marginTop: 8, ...texte(10) }}>
          <div style={{ fontWeight: 800, fontSize: 124, letterSpacing: -2, lineHeight: 1.1 }}>{titre}</div>
          {sousTitreNom ? (
            <LigneJustifiee
              texte={sousTitreNom.toUpperCase()}
              style={{ fontWeight: 600, fontSize: 30, color: C.blanc, opacity: 0.9, marginTop: 2, padding: "0 4px" }}
            />
          ) : null}
        </div>
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
export const FinRubrique: React.FC<{
  photo: string;
  surtitre?: string;
  titre: string;
  sousTitre: string;
  logoHaut?: boolean;
  sousTitreManuscrit?: boolean; // sous-titre en Allison or (typo secondaire)
  sousTitreNom?: string; // petite ligne justifiée sous le titre, de la largeur du mot
  logoAgence?: string; // logo de l'agence (version blanche) affiché à la place du titre
}> = ({ photo, surtitre, titre, sousTitre, logoHaut = false, sousTitreManuscrit = false, sousTitreNom, logoAgence }) => {
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
      {logoHaut ? (
        <Img src={MEDIA.logoBlanc} style={{ position: "absolute", top: 230, left: 340, width: 400, ...texte(4) }} />
      ) : null}
      <div style={{ position: "absolute", top: logoAgence ? 640 : 760, left: 90, right: 90, textAlign: "center", fontFamily: FONT, color: C.blanc }}>
        {surtitre ? (
          <div style={{ fontWeight: 700, fontSize: 34, letterSpacing: 6, color: C.or, lineHeight: 1.45, textTransform: "uppercase", ...texte(8) }}>{surtitre}</div>
        ) : null}
        {logoAgence ? (
          <Img src={logoAgence} style={{ display: "block", width: 600, margin: "22px auto 0", ...texte(14) }} />
        ) : (
        <div style={{ display: "inline-block", marginTop: 16, ...texte(14) }}>
          <div style={{ fontWeight: 800, fontSize: 116, letterSpacing: -2, lineHeight: 1.08 }}>{titre}</div>
          {sousTitreNom ? (
            <LigneJustifiee
              texte={sousTitreNom.toUpperCase()}
              style={{ fontWeight: 600, fontSize: 28, color: C.blanc, opacity: 0.9, marginTop: 4, padding: "0 4px" }}
            />
          ) : null}
        </div>
        )}
        <div style={{ width: 380 * filet, height: 4, background: C.or, margin: "26px auto 26px" }} />
        {sousTitreManuscrit ? (
          <div style={{ fontFamily: "Allison, cursive", fontSize: 120, lineHeight: 0.9, color: C.or, ...texte(22) }}>{sousTitre}</div>
        ) : (
          <div style={{ fontWeight: 500, fontSize: 38, ...texte(22) }}>{sousTitre}</div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Ouverture « Témoignage » (autre rubrique) : vidéo plein écran sous un voile marine translucide,
// grand titre lumineux, sous-titre, et pastille de lieu avec pictogramme ----------
const Pin: React.FC<{ taille: number; couleur: string }> = ({ taille, couleur }) => (
  <svg width={taille} height={taille} viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.6" />
  </svg>
);
export const OuvertureTemoignage: React.FC<{
  video: React.ReactNode;
  titre: string;
  sousTitre: string[];
  lieu: string | string[];
  duration: number;
  decalage?: number; // décalage vertical du bloc (px)
}> = ({ video, titre, sousTitre, lieu, duration, decalage = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const voile = interpolate(frame, [0, 10], [0.3, 0.62], clamp);
  const pSigle = spring({ frame, fps, config: { damping: 12, stiffness: 170, mass: 0.6 } });
  const pTitre = interpolate(frame, [8, 24], [0, 1], { ...clamp, easing: ease });
  const pSous = interpolate(frame, [18, 32], [0, 1], { ...clamp, easing: ease });
  const pLieu = spring({ frame: frame - 28, fps, config: { damping: 13, stiffness: 180, mass: 0.6 } });
  const sortie = interpolate(frame, [duration - 8, duration], [1, 0], clamp);
  return (
    <AbsoluteFill>
      {video}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(27,44,66,${voile * 1.1}) 0%, rgba(43,66,88,${voile}) 40%, rgba(43,66,88,${voile * 0.45}) 62%, rgba(27,44,66,${voile * 0.6}) 100%)`,
        }}
      />
      {/* sigle GNI (G blanc, barre or) en tout début */}
      <svg
        viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
        width={112}
        height={(112 * SIGLE.h) / SIGLE.w}
        style={{
          position: "absolute",
          top: 230 + decalage,
          left: 484,
          opacity: Math.min(1, pSigle * 1.4) * sortie,
          transform: `scale(${0.6 + 0.4 * Math.min(pSigle, 1.05)})`,
          filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
        }}
      >
        <path d={SIGLE.gPath} fill={C.blanc} />
        <path d={SIGLE.barPath} fill={C.or} />
      </svg>
      <div style={{ position: "absolute", top: 410 + decalage, left: 60, right: 60, textAlign: "center", fontFamily: FONT, color: C.blanc, opacity: sortie }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 118,
            lineHeight: 1,
            letterSpacing: -3,
            textShadow: "0 0 28px rgba(255,255,255,0.35), 0 6px 24px rgba(0,0,0,0.45)",
            opacity: pTitre,
            transform: `scale(${1.08 - 0.08 * pTitre})`,
            filter: `blur(${(1 - pTitre) * 10}px)`,
          }}
        >
          {titre.split("|").map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        <div style={{ marginTop: 20, opacity: pSous, transform: `translateY(${(1 - pSous) * 18}px)` }}>
          {sousTitre.map((l, i) => (
            <div key={i} style={{ fontWeight: 700, fontSize: 44, lineHeight: 1.2, textShadow: "0 0 18px rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.45)" }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 32 }}>
          {(Array.isArray(lieu) ? lieu : [lieu]).map((l, n) => (
            <div
              key={n}
              style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "11px 32px 13px 24px",
            borderRadius: 60,
            background: "rgba(217, 174, 87, 0.42)",
            border: "2px solid rgba(217, 174, 87, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            transform: `translateY(${(1 - Math.min(pLieu, 1)) * 30}px) scale(${0.8 + 0.2 * Math.min(pLieu, 1.04)})`,
            opacity: Math.min(1, pLieu * 1.5),
          }}
        >
          <Pin taille={36} couleur={C.blanc} />
          <span style={{ fontWeight: 700, fontSize: 38, color: C.blanc }}>{l}</span>
        </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
