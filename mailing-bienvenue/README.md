# Mail de bienvenue · nouvelles agences adhérentes

Mail HTML aux couleurs de la nouvelle charte (marine #2B4258, or #D9AE57, blanc ; Montserrat),
prêt à importer dans Zoho Campaigns (« Importer du HTML » / éditeur de code).

| Fichier | Rôle |
|---|---|
| `mail-bienvenue.html` | Le mail (600 px, compatible mobile et Outlook) |
| `images/logo-gni-blanc.png` | Logo officiel blanc, à importer dans Zoho |
| `images/photo-equipe.jpg` | Photo de l'équipe, à importer dans Zoho |
| `apercu.png` / `apercu-mobile.png` | Aperçus du rendu |

**Objet proposé :** Bienvenue au Groupe National Immobilier, $[LF:FIRSTNAME]$ !
**Pré-header :** Toute l'équipe est ravie de vous accueillir. Voici vos premiers pas dans le Groupement.

## Avant l'envoi

1. Importer `images/logo-gni-blanc.png` et `images/photo-equipe.jpg` dans la bibliothèque d'images Zoho,
   puis remplacer les deux `src="images/…"` par les URL obtenues.
2. Compléter la signature : `[PRÉNOM NOM]`, `[FONCTION]` et `[TÉLÉPHONE DIRECT]`.
   Vérifier la balise prénom `$[LF:FIRSTNAME]$` (menu « Insérer un champ de fusion » de Zoho) et lui donner
   une valeur par défaut, pour éviter un « Bonjour , » si le prénom est vide.
3. Vérifier l'adresse mail du médiateur (dans l'ancien mail : `messinguiral@cpmn.fnewsletter2go.com`,
   adresse visiblement altérée par un outil de suivi).
4. Envoyer un test (Gmail, Outlook, mobile) et cliquer chaque lien.
