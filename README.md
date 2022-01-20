# "FishEye", une plateforme pour photographes [projet OC #06]

(Version avant le 10-11-2021)

Création "from scratch" d'une plateforme accessible pour photographes.
Site responsive, optimisé pour affichage sur mobile et desktop.
Langages utilisés : HTML, CSS (Sass), JavaScript (TypeScript)
Données récupérées à partir d'un fichier JSON fourni.

Démo live du site à l'adresse : https://stebenwolf.github.io/BenS_6_21012022_version-avant-10-11-21_open-classrooms_project06/index.html

## Page d'accueil

* Affichage de l'ensemble des photographes présents sur la plateforme.
* Pour chaque photographe, on affiche : 
   - sa photo, dans un cadre arrondi avec ombre portée
   - ses nom et prénom
   - sa localisation (ville + pays)
   - son TJ
   - une citation personnelle
   - la liste des tags lui correspondant
* Un clic sur la photo ou le nom redirige vers la page personnelle du/de la photographe
* Un clic sur l'un des tags affiche uniquement les photographes ayant le même tag.
* Idem pour la liste de tags en haut de page, ils permettent de filtrer les résultats

## Page personnelle

* On récupère l'ID du photographe dans l'URL (?id=xxx)
* Affichage d'un bandeau d'information, reprenant les informations du photographe, + un formulaire de contact accessible depuis le bouton "Contactez-moi"
* En-dessous (sur desktop), on trouve un menu déroulant permettant de choisir trois types de tri :
   - par popularité (nombre de likes décroissant, tri par défaut)
   - par date de prise de vue (par ordre antichronologique)
   - par ordre alphabétique (dans l'ordre naturel cette fois)
* Enfin, on affiche la liste des médias associés à un photographe (images et vidéos).
* Pour chaque média, on affiche son titre et le nombre de likes.
* Le nombre de likes est clickable et incrémentable, et le total de likes affiché en bas de page (sur desktop) s'actualise automatiquement
* Enfin, chaque média est clickable et lance l'affichage d'une lightbox présentant le média choisi en plus grand format

La navigation peut se faire au clavier :
* touche Tab pour naviguer entre les différents éléments
* Enter pour sélectionner un élément
* Flèche gauche / Flèche droite pour passer d'une photo à une autre
* Escape pour fermer les modales (contact et lightbox)

Le site passe les validateurs W3C (HTML et CSS), ainsi que le vérificateur d'accessibilité AChecker.
