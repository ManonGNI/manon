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

## Découpage

| Temps | Plan | Texte |
|---|---|---|
| 0 – 3,9 s | Ancien logo sur blanc | « 2007. Des agences indépendantes réunies pour collaborer » |
| 3,7 – 12,7 s | Flash-back : 5 photos d'événements, flash blanc à chaque coupe | Des conventions. / Des rencontres. / Des réussites partagées. / Près de 450 agences partenaires. / Un même collectif. |
| 12,5 – 17 s | Fond bleu, « 20 » monumental | « ans, bientôt. Et le Groupe évolue. » |
| 16,8 – 22,6 s | Ancien logo → volet bleu → montage du nouveau bloc-marque : le filet se trace, le texte se révèle, la barre dorée glisse dans le G (la clé dans la serrure) | « Notre nouvelle identité. » |
| 22,4 – 27,4 s | Fond bleu | « Le groupement demeure et un réseau se lance » |
| 27,2 – 30 s | Carton de fin | Logo, « Plus fortes ensemble. » (Allison), site web |

## Médias à déposer dans `assets/medias/`

- `ancien-logo.png` : ancien logo, fond transparent
- `flashback-1.jpg` à `flashback-5.jpg` : photos réelles (conventions, rencontres, agences), idéalement verticales

Puis relancer `node render.mjs`. Les textes se modifient dans le bloc `CONFIG` en haut du script de `index.html`.
