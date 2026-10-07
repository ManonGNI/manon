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

## Découpage (concept « mur de souvenirs »)

Les photos d'événements sont horizontales : elles sont montrées à leur format d'origine (nettes),
jamais étirées en plein écran vertical.

| Temps | Plan |
|---|---|
| 0 – 3 s | Ancien logo, « 2007. Des agences indépendantes réunies pour collaborer » |
| 2,8 – 3,4 s | Le mur de photos pousse l'écran blanc vers le haut |
| 3 – 10,8 s | Mur de souvenirs : 5 rangées de photos qui défilent en sens alternés (accélération à chaque phrase), bandeau bleu central avec les phrases mot à mot |
| 10,6 – 11,4 s | Le mur s'envole (zoom) et révèle un « 20 » géant rempli de photos qui défilent dans les chiffres |
| 12,4 – 15 s | « ans, bientôt. Et le Groupe évolue. » |
| 15 – 21 s | Ouverture en iris depuis le « 0 » ; l'ancien logo est éjecté, un filet d'or tombe et devient le filet du nouveau logo, qui se construit (barre du G = la clé) · « Notre nouvelle identité. » |
| 21,4 – 26,4 s | « Le groupement demeure » (photo convention) / « et un réseau se lance » (photo de groupe) |
| 26,4 – 30 s | Carton de fin : logo, « Plus fortes ensemble. », site web |

Tous les textes et le choix des vignettes se modifient dans le bloc `CONFIG`
(« | » = retour à la ligne, `*mot*` = mot en doré).

## Médias à déposer dans `assets/medias/`

- `ancien-logo.png` : ancien logo, fond transparent (fourni)
- `flashback-1.jpg` à `flashback-5.jpg` : photos réelles des événements (fournies). Les photos paysage sont parcourues par un lent travelling horizontal, réglable via `pan` dans `CONFIG`.

Puis relancer `node render.mjs`. Les textes se modifient dans le bloc `CONFIG` en haut du script de `index.html`.
