import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MEDIA, Mot } from "./theme";
import { SIGLE } from "./sigle";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

// Sous-titres synchronisés : texte blanc épais, surlignage or qui passe sous le mot prononcé.
// `offset` = temps (s) du fichier source au début de la séquence
export const Captions: React.FC<{ items: Mot[][]; offset: number }> = ({ items, offset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = offset + frame / fps;
  const idx = items.findIndex((line, i) => {
    const next = items[i + 1];
    const lastEnd = line[line.length - 1][2];
    const end = next && next[0][1] - lastEnd < 0.6 ? next[0][1] : lastEnd + 0.3;
    return t >= line[0][1] - 0.05 && t < end;
  });
  if (idx < 0) return null;
  const line = items[idx];
  const appear = interpolate((t - line[0][1]) * fps, [-1.5, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  // mot actif = dernier mot commencé ; le surlignage reste sur le dernier mot jusqu'à la ligne suivante
  let active = -1;
  line.forEach(([, s], i) => {
    if (t >= s - 0.03) active = i;
  });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 460 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 940,
          rowGap: 6,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          color: C.blanc,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.55), 0 0 2px rgba(0, 0, 0, 0.35)",
          opacity: appear,
          transform: `translateY(${(1 - appear) * 12}px)`,
        }}
      >
        {line.map(([mot, s], i) => {
          const on = i === active;
          const p = on
            ? interpolate((t - s) * fps, [-1, 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })
            : 0;
          return (
            <span key={i} style={{ position: "relative", padding: "2px 12px 6px", margin: "0 1px" }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: C.or,
                  borderRadius: 8,
                  transform: `scaleX(${p})`,
                  transformOrigin: "left center",
                  opacity: on ? 1 : 0,
                }}
              />
              <span style={{ position: "relative" }}>{mot}</span>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Bandeau nom / fonction, style « Journal de l'Agence » :
// nom blanc sur bloc marine avec filet or vertical, cartouche blanc pour la fonction
export const LowerThird: React.FC<{ nom: string; role: string; structure: string; duration: number; top?: number }> = ({
  nom,
  role,
  structure,
  duration,
  top = 1030,
}) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const rule = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: ease });
  const name = interpolate(frame, [4, 18], [0, 1], { ...clamp, easing: ease });
  const card = interpolate(frame, [12, 26], [0, 1], { ...clamp, easing: ease });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out, fontFamily: FONT }}>
      <div style={{ position: "absolute", left: 76, top }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: 7, background: C.or, transform: `scaleY(${rule})`, transformOrigin: "top" }} />
          <div
            style={{
              background: C.marine,
              color: C.blanc,
              fontWeight: 700,
              fontSize: 60,
              letterSpacing: -0.5,
              padding: "12px 44px 16px 20px",
              clipPath: `inset(0 ${(1 - name) * 100}% 0 0)`,
            }}
          >
            {nom}
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            marginLeft: 13,
            background: C.blanc,
            color: C.marine,
            fontWeight: 500,
            fontSize: 33,
            lineHeight: 1.45,
            padding: "10px 40px 12px 16px",
            clipPath: `inset(0 ${(1 - card) * 100}% 0 0)`,
          }}
        >
          {role}
          <br />
          {structure}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Logo officiel en signature : blanc en haut à gauche (extérieur), bleu en haut à droite (intérieur, mur clair)
export const LogoSignature: React.FC<{ duration: number; variante?: "blanc" | "bleu" }> = ({ duration, variante = "blanc" }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return variante === "blanc" ? (
    <Img src={MEDIA.logoBlanc} style={{ position: "absolute", left: 64, top: 110, width: 230, opacity: o * 0.95 }} />
  ) : (
    <Img src={MEDIA.logoBleu} style={{ position: "absolute", right: 60, top: 110, width: 230, opacity: o }} />
  );
};

// Accroche du témoignage : bloc marine en haut, filet or, texte blanc
export const TitreAccroche: React.FC<{ lignes: string[]; duration: number }> = ({ lignes, duration }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const inP = interpolate(frame, [2, 16], [0, 1], { ...clamp, easing: ease });
  const rule = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: ease });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", left: 76, top: 210, display: "flex" }}>
        <div style={{ width: 9, background: C.or, transform: `scaleY(${rule})`, transformOrigin: "top" }} />
        <div
          style={{
            background: C.marine,
            color: C.blanc,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 66,
            lineHeight: 1.1,
            letterSpacing: -1,
            padding: "22px 48px 26px 26px",
            clipPath: `inset(0 ${(1 - inP) * 100}% 0 0)`,
          }}
        >
          {lignes.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Écran de fin marine, reprenant la disposition de la carte agence GNI
const FONT_ENSEIGNE = "Inter, 'Helvetica Neue', Arial, sans-serif";

// `partenaire` : agence partenaire (non licenciée) — le nom de l'agence domine, puis un filet,
// la mention (« Agence partenaire du ») et le logo GNI en plus petit, pour ne pas laisser croire
// que l'agence est sous l'enseigne du groupe
export const EcranFin: React.FC<{
  nom: string[];
  villes: string[];
  tailleNom?: number;
  accroche?: string;
  partenaire?: { mention: string };
  logoAgence?: string; // logo officiel de l'agence, affiché tel quel dans son cartouche (à la place du nom en texte)
}> = ({ nom, villes, tailleNom = 82, accroche = "Bienvenue à l'agence", partenaire, logoAgence }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const bg = interpolate(frame, [0, 10], [0, 1], clamp);
  const prog = (d: number, len = 16) => interpolate(frame, [d, d + len], [0, 1], { ...clamp, easing: ease });
  // ligne qui monte derrière un masque
  const maskRise = (d: number): React.CSSProperties => ({ transform: `translateY(${(1 - prog(d, 18)) * 110}%)` });

  // Sigle : arrive en grand puis se pose ; la barre or glisse depuis la droite
  const gIn = prog(2, 34);
  const barIn = prog(14, 26);
  // « Bienvenue à l'agence » : écrit de gauche à droite
  const ecrit = interpolate(frame, [10, 42], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  // reflet doré qui balaie le texte manuscrit une fois écrit
  const reflet = interpolate(frame, [48, 78], [-30, 130], clamp);

  return (
    <AbsoluteFill style={{ background: C.marine, opacity: bg, color: C.blanc, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
        width={1000}
        height={(1000 * SIGLE.h) / SIGLE.w}
        style={{
          position: "absolute",
          left: 250,
          top: 560,
          opacity: gIn,
          transform: `scale(${1.35 - 0.35 * gIn}) rotate(${(1 - gIn) * -12}deg) scale(${1 + 0.03 * prog(40, 95)})`,
          transformOrigin: "50% 50%",
        }}
      >
        <path d={SIGLE.gPath} fill={C.blanc} fillOpacity={0.08} />
        <g transform={`translate(${(1 - barIn) * 90} 0)`} opacity={barIn}>
          <path d={SIGLE.barPath} fill={C.or} fillOpacity={0.4} />
        </g>
      </svg>

      <div style={{ position: "absolute", left: 104, top: 540, right: 40 }}>
        <div
          style={{
            fontFamily: "Allison, cursive",
            fontSize: 118,
            lineHeight: 1,
            color: C.or,
            marginLeft: -6,
            marginBottom: 6,
            clipPath: `inset(-20% ${(1 - ecrit) * 100}% -20% -5%)`,
            backgroundImage: `linear-gradient(100deg, ${C.or} ${reflet - 12}%, #F6E2B3 ${reflet}%, ${C.or} ${reflet + 12}%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {accroche}
        </div>
        {logoAgence ? (
          <div style={{ overflow: "hidden", width: 700, marginTop: 10 }}>
            <Img
              src={logoAgence}
              style={{
                display: "block",
                width: 700,
                borderRadius: 4,
                clipPath: `inset(0 0 ${(1 - prog(24, 20)) * 100}% 0)`,
                transform: `scale(${1.04 - 0.04 * prog(24, 30)})`,
                transformOrigin: "left top",
              }}
            />
          </div>
        ) : (
        <div style={{ fontFamily: FONT_ENSEIGNE, fontWeight: 300, fontSize: tailleNom, lineHeight: 1.12, letterSpacing: -1.5 }}>
          {nom.map((ligne, i) => (
            <div key={i} style={{ overflow: "hidden", fontSize: partenaire ? (i === 0 ? tailleNom * 1.5 : tailleNom * 0.82) : undefined }}>
              <div style={maskRise(26 + i * 5)}>{ligne}</div>
            </div>
          ))}
        </div>
        )}
        <div style={{ marginTop: 14 }}>
          {villes.map((ville, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <div style={{ fontFamily: FONT_ENSEIGNE, fontWeight: 400, fontSize: 44, lineHeight: 1.25, color: C.or, ...maskRise(36 + i * 4) }}>
                {ville}
              </div>
            </div>
          ))}
        </div>
        {partenaire ? (
          <div style={{ marginTop: 80 }}>
            <div style={{ width: 140 * prog(44, 18), height: 2, background: "rgba(255, 255, 255, 0.45)" }} />
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 32,
                marginTop: 30,
                opacity: 0.85 * prog(48),
                transform: `translateY(${(1 - prog(48)) * 14}px)`,
              }}
            >
              {partenaire.mention}
            </div>
            <Img
              src={MEDIA.logoBlanc}
              style={{
                display: "block",
                width: 400,
                marginTop: 22,
                opacity: prog(54),
                transform: `translateX(${(1 - prog(54, 20)) * -40}px)`,
              }}
            />
          </div>
        ) : (
          <div style={{ position: "relative", marginTop: 90, width: 540 }}>
            <Img
              src={MEDIA.logoBlanc}
              style={{
                display: "block",
                width: 540,
                opacity: prog(48),
                transform: `translateX(${(1 - prog(48, 20)) * -40}px)`,
              }}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Signature « Agence partenaire du » (italique) + logo GNI, sur une ligne (blanc sur fond sombre, bleu sur fond clair)
const SignaturePartenaire: React.FC<{ p: number; mention: string; largeurLogo?: number; clair?: boolean }> = ({
  p,
  mention,
  largeurLogo = 300,
  clair = false,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 26,
      opacity: p,
      transform: `translateY(${(1 - p) * 16}px)`,
    }}
  >
    <div style={{ fontFamily: FONT, fontStyle: "italic", fontWeight: 500, fontSize: 34, color: clair ? C.marine : C.blanc, opacity: 0.9 }}>
      {mention}
    </div>
    <Img src={clair ? MEDIA.logoBleu : MEDIA.logoBlanc} style={{ width: largeurLogo }} />
  </div>
);

// « Bienvenue à » manuscrit, écrit de gauche à droite avec un reflet
const Manuscrit: React.FC<{ texte: string; couleur: string; reflet: string; top: number; frame: number; taille?: number }> = ({
  texte,
  couleur,
  reflet,
  top,
  frame,
  taille = 118,
}) => {
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const ecrit = interpolate(frame, [8, 38], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const r = interpolate(frame, [44, 74], [-30, 130], clamp);
  return (
    <div
      style={{
        position: "absolute",
        top,
        width: "100%",
        textAlign: "center",
        fontFamily: "Allison, cursive",
        fontSize: taille,
        lineHeight: 1,
        clipPath: `inset(-20% ${(1 - ecrit) * 100}% -20% -5%)`,
        backgroundImage: `linear-gradient(100deg, ${couleur} ${r - 12}%, ${reflet} ${r}%, ${couleur} ${r + 12}%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {texte}
    </div>
  );
};

const CREME = "#FDFCF5"; // couleur du fond du logo Alexandra
export const IVOIRE = "#F7F3EA"; // fond ivoire (à ajuster au code exact de la charte)

// Écran de fin « agence partenaire » — 3 variantes :
// bandeau : bandeau crème pleine largeur avec le logo, sur fond marine
// split   : écran partagé, moitié haute crème (logo en grand), moitié basse marine (signature), filet or
// photo   : photo d'Alexandra en fond, dégradé marine, carte crème avec le logo
// ivoire  : fond ivoire uni, logo de l'agence posé directement, filet or, signature avec le logo GNI bleu
export type VarianteFin = "bandeau" | "split" | "photo" | "ivoire";
export const EcranFinPartenaire: React.FC<{
  logoAgence: string;
  ratioLogo: number;
  variante?: VarianteFin;
  fond?: string;
  accroche?: string;
  mention?: string;
}> = ({ logoAgence, ratioLogo, variante = "bandeau", fond, accroche = "Bienvenue à", mention = "Agence partenaire du" }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const prog = (d: number, len = 16) => interpolate(frame, [d, d + len], [0, 1], { ...clamp, easing: ease });
  const bg = interpolate(frame, [0, 10], [0, 1], clamp);

  if (variante === "ivoire") {
    const logo = prog(18, 24);
    const filet = prog(36, 18);
    const LARGEUR = 800;
    const TOP_LOGO = 600;
    const BAS_LOGO = TOP_LOGO + LARGEUR / ratioLogo;
    return (
      <AbsoluteFill style={{ background: IVOIRE, opacity: bg, overflow: "hidden" }}>
        <svg
          viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
          width={760}
          height={(760 * SIGLE.h) / SIGLE.w}
          style={{ position: "absolute", left: 600, top: 1320, opacity: prog(44, 30) }}
        >
          <path d={SIGLE.gPath} fill={C.marine} fillOpacity={0.05} />
          <path d={SIGLE.barPath} fill={C.or} fillOpacity={0.35} />
        </svg>
        <Manuscrit texte={accroche} couleur={C.marine} reflet="#6C86A3" top={TOP_LOGO - 150} frame={frame} />
        <Img
          src={logoAgence}
          style={{
            position: "absolute",
            top: TOP_LOGO,
            left: (1080 - LARGEUR) / 2,
            width: LARGEUR,
            opacity: logo,
            transform: `translateY(${(1 - logo) * 24}px) scale(${0.97 + 0.03 * logo})`,
          }}
        />
        <div style={{ position: "absolute", top: BAS_LOGO + 70, left: 540 - 70 * filet, width: 140 * filet, height: 3, background: C.or }} />
        <div style={{ position: "absolute", top: BAS_LOGO + 140, width: "100%" }}>
          <SignaturePartenaire p={prog(44)} mention={mention} largeurLogo={320} clair />
        </div>
      </AbsoluteFill>
    );
  }

  if (variante === "split") {
    const volet = prog(4, 22); // le panneau crème descend du haut
    const filet = prog(22, 20);
    const logo = prog(18, 22);
    const LARGEUR = 820;
    return (
      <AbsoluteFill style={{ background: C.marine, opacity: bg, overflow: "hidden" }}>
        <svg
          viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
          width={760}
          height={(760 * SIGLE.h) / SIGLE.w}
          style={{ position: "absolute", left: 560, top: 1240, opacity: prog(40, 30) }}
        >
          <path d={SIGLE.gPath} fill={C.blanc} fillOpacity={0.07} />
          <path d={SIGLE.barPath} fill={C.or} fillOpacity={0.3} />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1100, background: CREME, transform: `translateY(${(volet - 1) * 100}%)` }} />
        <Manuscrit texte={accroche} couleur={C.marine} reflet="#6C86A3" top={250} frame={frame} />
        <Img
          src={logoAgence}
          style={{
            position: "absolute",
            top: 420,
            left: (1080 - LARGEUR) / 2,
            width: LARGEUR,
            height: LARGEUR / ratioLogo,
            opacity: logo,
            transform: `translateY(${(1 - logo) * 24}px)`,
          }}
        />
        <div style={{ position: "absolute", top: 1098, left: 540 - 540 * filet, width: 1080 * filet, height: 6, background: C.or }} />
        <div style={{ position: "absolute", top: 1330, width: "100%" }}>
          <SignaturePartenaire p={prog(40)} mention={mention} largeurLogo={320} />
        </div>
      </AbsoluteFill>
    );
  }

  if (variante === "photo") {
    const zoom = interpolate(frame, [0, 140], [1.0, 1.06], clamp);
    const carte = prog(18, 20);
    const LARGEUR = 600;
    return (
      <AbsoluteFill style={{ background: C.marine, opacity: bg, overflow: "hidden" }}>
        {fond ? <Img src={fond} style={{ position: "absolute", inset: 0, width: 1080, height: 1920, objectFit: "cover", transform: `scale(${zoom})` }} /> : null}
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, rgba(43,66,88,0.55) 0%, rgba(43,66,88,0.78) 38%, rgba(43,66,88,0.96) 62%, ${C.marine} 100%)`,
          }}
        />
        <Manuscrit texte={accroche} couleur={C.or} reflet="#F6E2B3" top={560} frame={frame} />
        <div
          style={{
            position: "absolute",
            top: 710,
            left: (1080 - (LARGEUR + 80)) / 2,
            width: LARGEUR + 80,
            padding: 40,
            background: CREME,
            borderRadius: 6,
            opacity: carte,
            transform: `translateY(${(1 - carte) * 40}px)`,
          }}
        >
          <Img src={logoAgence} style={{ display: "block", width: LARGEUR }} />
        </div>
        <div style={{ position: "absolute", top: 710 + LARGEUR / ratioLogo + 80 + 110, width: "100%" }}>
          <SignaturePartenaire p={prog(40)} mention={mention} />
        </div>
      </AbsoluteFill>
    );
  }

  // bandeau
  const bandeau = prog(16, 18);
  const logo = prog(26, 20);
  const LARGEUR_LOGO = 660;
  const HAUT_BANDEAU = Math.round(LARGEUR_LOGO / ratioLogo + 110);
  const TOP_BANDEAU = 640;
  return (
    <AbsoluteFill style={{ background: C.marine, opacity: bg, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
        width={820}
        height={(820 * SIGLE.h) / SIGLE.w}
        style={{ position: "absolute", left: 520, top: 1180, opacity: prog(40, 40) }}
      >
        <path d={SIGLE.gPath} fill={C.blanc} fillOpacity={0.07} />
        <path d={SIGLE.barPath} fill={C.or} fillOpacity={0.3} />
      </svg>
      <Manuscrit texte={accroche} couleur={C.or} reflet="#F6E2B3" top={TOP_BANDEAU - 150} frame={frame} />
      <div style={{ position: "absolute", top: TOP_BANDEAU, left: 0, width: 1080, height: HAUT_BANDEAU, background: CREME, transform: `scaleX(${bandeau})` }} />
      <Img
        src={logoAgence}
        style={{
          position: "absolute",
          top: TOP_BANDEAU + 55,
          left: (1080 - LARGEUR_LOGO) / 2,
          width: LARGEUR_LOGO,
          opacity: logo,
          transform: `translateY(${(1 - logo) * 18}px) scale(${0.97 + 0.03 * logo})`,
        }}
      />
      <div style={{ position: "absolute", top: TOP_BANDEAU + HAUT_BANDEAU + 110, width: "100%" }}>
        <SignaturePartenaire p={prog(46)} mention={mention} />
      </div>
    </AbsoluteFill>
  );
};

// Écran de fin du témoignage sur fond ivoire : « Rejoignez le groupement », logo GNI bleu, cible et site
export const EcranFinGroupementIvoire: React.FC<{ accroche: string; lignes: string[]; site: string }> = ({ accroche, lignes, site }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const prog = (d: number, len = 16) => interpolate(frame, [d, d + len], [0, 1], { ...clamp, easing: ease });
  const bg = interpolate(frame, [0, 20], [0, 1], clamp); // fondu plus long depuis la dernière image
  const logo = prog(18, 24);
  const filet = prog(36, 18);
  const LARGEUR = 620;
  const TOP_LOGO = 720;
  const BAS_LOGO = TOP_LOGO + (LARGEUR * 1085) / 2000;
  return (
    <AbsoluteFill style={{ background: IVOIRE, opacity: bg, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${SIGLE.w} ${SIGLE.h}`}
        width={760}
        height={(760 * SIGLE.h) / SIGLE.w}
        style={{ position: "absolute", left: 600, top: 1320, opacity: prog(44, 30) }}
      >
        <path d={SIGLE.gPath} fill={C.marine} fillOpacity={0.05} />
        <path d={SIGLE.barPath} fill={C.or} fillOpacity={0.35} />
      </svg>
      <Manuscrit texte={accroche} couleur={C.marine} reflet="#6C86A3" top={TOP_LOGO - 170} frame={frame} />
      <Img
        src={MEDIA.logoBleu}
        style={{
          position: "absolute",
          top: TOP_LOGO,
          left: (1080 - LARGEUR) / 2,
          width: LARGEUR,
          opacity: logo,
          transform: `translateY(${(1 - logo) * 24}px) scale(${0.97 + 0.03 * logo})`,
        }}
      />
      <div style={{ position: "absolute", top: BAS_LOGO + 70, left: 540 - 70 * filet, width: 140 * filet, height: 3, background: C.or }} />
      <div
        style={{
          position: "absolute",
          top: BAS_LOGO + 120,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT,
          color: C.marine,
          opacity: prog(44),
          transform: `translateY(${(1 - prog(44)) * 16}px)`,
        }}
      >
        <div style={{ fontWeight: 500, fontSize: 38, lineHeight: 1.3 }}>{lignes.join(" ")}</div>
        <div style={{ fontWeight: 500, fontSize: 30, marginTop: 14, opacity: 0.7 }}>{site}</div>
      </div>
    </AbsoluteFill>
  );
};

// Accroche du témoignage — variantes modernes
// xxl   : grandes lettres blanches sur l'image (dégradé sombre en haut), une seule typo, mots clés en or
// mot   : la question apparaît mot à mot, surlignage or sur le mot clé (même langage que les sous-titres)
// carte : carte ivoire, texte marine, trait or qui se dessine
export type VarianteAccroche = "xxl" | "mot" | "carte";
export const AccrocheModerne: React.FC<{ variante: VarianteAccroche; duration: number }> = ({ variante, duration }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const prog = (d: number, len = 14) => interpolate(frame, [d, d + len], [0, 1], { ...clamp, easing: ease });
  const out = interpolate(frame, [duration - 10, duration], [1, 0], clamp);

  if (variante === "xxl") {
    const ligne = (d: number): React.CSSProperties => ({
      opacity: prog(d),
      transform: `translateY(${(1 - prog(d, 16)) * 40}px)`,
      filter: `blur(${(1 - prog(d, 12)) * 8}px)`,
    });
    return (
      <AbsoluteFill style={{ opacity: out }}>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,30,42,0.62) 0%, rgba(20,30,42,0.25) 30%, rgba(20,30,42,0) 42%)" }} />
        <div style={{ position: "absolute", top: 96, left: 72, right: 60, color: C.blanc, textShadow: "0 2px 14px rgba(0,0,0,0.35)" }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 92, lineHeight: 1.05, letterSpacing: -2.5, ...ligne(2) }}>Pourquoi</div>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 92, lineHeight: 1.05, letterSpacing: -2.5, ...ligne(8) }}>
            Alexandra a rejoint
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 92, lineHeight: 1.05, letterSpacing: -2.5, ...ligne(14) }}>
            <span style={{ color: C.or }}>notre Groupe</span> ?
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  if (variante === "mot") {
    const mots: [string, boolean][] = [
      ["Pourquoi", false], ["Alexandra", false], ["a", false], ["rejoint", false], ["notre", true], ["Groupe\u00a0?", true],
    ];
    return (
      <AbsoluteFill style={{ opacity: out }}>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,30,42,0.45) 0%, rgba(20,30,42,0) 35%)" }} />
        <div
          style={{
            position: "absolute",
            top: 190,
            left: 70,
            right: 70,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            rowGap: 10,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 80,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            color: C.blanc,
            textShadow: "0 2px 12px rgba(0,0,0,0.45)",
          }}
        >
          {mots.map(([m, cle], i) => {
            const p = prog(3 + i * 4, 8);
            const surl = cle ? prog(3 + 5 * 4, 8) : 0;
            return (
              <span
                key={i}
                style={{
                  position: "relative",
                  padding: "0 14px 6px",
                  opacity: p,
                  transform: `scale(${0.7 + 0.3 * p})`,
                  display: "inline-block",
                }}
              >
                {cle ? (
                  <span
                    style={{
                      position: "absolute",
                      inset: "4px 2px 0",
                      background: C.or,
                      borderRadius: 10,
                      transform: `scaleX(${surl})`,
                      transformOrigin: "left center",
                    }}
                  />
                ) : null}
                <span style={{ position: "relative" }}>{m}</span>
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  // carte ivoire
  const carte = prog(2, 16);
  const trait = prog(16, 18);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 60,
          right: 60,
          background: IVOIRE,
          borderRadius: 6,
          padding: "40px 46px 44px",
          opacity: carte,
          transform: `translateY(${(1 - carte) * -30}px)`,
        }}
      >
        <div style={{ fontFamily: "Allison, cursive", fontSize: 96, lineHeight: 0.9, color: C.or }}>Pourquoi</div>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 70, lineHeight: 1.08, letterSpacing: -1.5, color: C.marine, marginTop: 4 }}>
          Alexandra a rejoint
          <br />
          notre Groupe ?
        </div>
        <div style={{ width: 160 * trait, height: 6, borderRadius: 3, background: C.or, marginTop: 24 }} />
      </div>
    </AbsoluteFill>
  );
};
