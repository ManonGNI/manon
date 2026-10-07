# Motion design · Nouveau logo Groupe National Immobilier

Reel 9:16 (1080 × 1920), 30 secondes, 30 i/s. Réalisé selon la charte graphique V4
(bleu #2F4A71, doré #D9AE57, blanc ; Montserrat ; Allison pour la phrase signature).

## Fichiers

| Fichier | Rôle |
|---|---|
| `GNI-nouveau-logo-reel.mp4` | Vidéo exportée (version provisoire, sans musique) |
| `index.html` | Animation (ouvrir dans un navigateur pour la lire en boucle) |
| `render.mjs` | Export MP4 : `node render.mjs` (nécessite Playwright + ffmpeg) |
| `assets/medias/` | Logo officiel découpé en calques (filet, texte, barre du G) + vos médias |

## Découpage (version dynamique)

Montage rythmé : coupes franches, textes révélés mot à mot, transitions par bandes,
légers « coups de caméra » sur les temps forts (calables sur une musique à ~120 BPM).

| Temps | Plan |
|---|---|
| 0 – 3 s | Ancien logo (apparition avec flou), « 2007. » puis « Des agences indépendantes réunies pour collaborer » |
| 2,6 – 3,4 s | Transition par bandes bleues |
| 3 – 10,5 s | Flash-back : 5 photos de 1,5 s, coupe sèche + zoom + flash blanc, travelling horizontal, texte mot à mot |
| 10,5 – 12 s | Mosaïque : les 5 photos en bandes verticales qui tombent et remontent en alternance |
| 12 – 15,8 s | Compteur 00 → 20, « ans, bientôt. Et le Groupe évolue. », puis zoom traversant vers le blanc |
| 15,5 – 21,4 s | Ancien logo → bandes bleues → montage du nouveau bloc-marque (filet, texte, barre du G) · « Notre nouvelle identité. » |
| 21,4 – 26,4 s | « Le groupement demeure et un réseau se lance » (« se lance » en doré, effet rebond) |
| 26,4 – 30 s | Carton de fin : logo, « Plus fortes ensemble. », « Bientôt 20 ans. Une nouvelle page. », site web |

Tous les textes se modifient dans le bloc `CONFIG` (« | » = retour à la ligne, `*mot*` = mot en doré).

## Médias à déposer dans `assets/medias/`

- `ancien-logo.png` : ancien logo, fond transparent (fourni)
- `flashback-1.jpg` à `flashback-5.jpg` : photos réelles des événements (fournies). Les photos paysage sont parcourues par un lent travelling horizontal, réglable via `pan` dans `CONFIG`.

Puis relancer `node render.mjs`. Les textes se modifient dans le bloc `CONFIG` en haut du script de `index.html`.
