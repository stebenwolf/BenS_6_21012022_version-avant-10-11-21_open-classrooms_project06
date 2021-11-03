import {Photograph} from "./photograph.js";
import {PhotographCard} from "./photograph-card.js";

/* // Cette fonction va chercher les informations photographes du fichier JSON et appeler la fonction displayPhoto 
function fetchPhotoInfos() {
    fetch("../requirements/FishEyeData.json")
    .then(response => response.json())
    .then(data => displayPhotoInfos(data.photographers))
    .catch(error => console.error("boulette de bique, erreur!!! ", error));
}

// Cette fonction affiche tous les profils de photographes de la liste "data"
function displayPhotoInfos(data: any) {
    for (const q of data) {
        const photograph = new Photograph(q.id, q.name, q.city, q.country, q.tags, q.tagline, q.price, q.portrait);
        const card = new PhotographCard().createPhotographCard(photograph);
    }
    return true; // histoire de renvoyer quelque chose?
}

fetchPhotoInfos(); */


/* -------------------------------------------------------------------------------------- */
/* POO below */
/* -------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------- */

// Qu'est-ce qu'on souhaite faire, et pourquoi ?
/* On veut créer un objet "photographe" qui va nous permettre en une commande d'accéder à une valeur donnée. Par exemple, photographer.id renvoie l'ID du photograph, photographer.name renvoie le nom du photographe, etc. 
*/
/* Objets à créer :
* un objet "Photographe"
* un objet "carte photographe" pour la page d'accueil, avec les différents composants: image, titre (le nom du photographe), sous-titre, prix, ville, tags...
* un objet "Media" avec les différentes photo d'un photographe; l'ID de la photo, l'ID du photographe, le titre de la photo, la date de prise de vue, le prix, etc.
*/

// Fonction asynchrone qui prend en input le type de données (photographe ou média), et renvoie les données JSON correspondantes.
async function fetchDataAsync(type: string = ("photographers" || "media")) {
    if(type === "photographers" || type === "media") {
        try {
            let response = await fetch("../requirements/FishEyeData.json");
            let data = await response.json();
            return data[type];
        }
        catch(error) {
            console.error("Erreur dans la fonction fetchDataAsync : ", error);
        }
    } else {
        return console.log("Fonction fetchDataAsync : Argument invalide");
    }
}

// Fonction qui créé les Photographes. Prend en entrée un tableau de résultats et renvoie un objet photographe.
function createPhotograph(item: any) {
    return new Photograph(
            item.id,
            item.name,
            item.city,
            item.country,
            item.tags,
            item.tagline,
            item.price,
            item.portrait
    );
}

// A partir des résultats de la requête asynchrone, on créé des profils photographes. 
fetchDataAsync("photographers").then(function(resultats) {
    for (let item of resultats) {
        const photograph = createPhotograph(item);
        new PhotographCard().createPhotographCard(photograph);
    }
});



function fetchSomePhotos(hashtag: string) {
    const resultList: Array<any> = [];
    fetch("../requirements/FishEyeData.json")
    .then(response => response.json())
    .then(data => {
        for (const q of data.photographers) {
            const request = q.tags.includes(hashtag);
            if(request) {
                resultList.push(q);
            }
        }
        //return displayPhotoInfos(resultList);
    })
    .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
}















/* DIVERS */
// Quand on sélectionne un hashtag, cette fonction renvoie les profils associés.
/* function fetchSomePhotosHere(hashtag: string) {
    const resultList: Array<any> = [];
    fetch("../requirements/FishEyeData.json")
    .then(response => response.json())
    .then(data => {
        for (const q of data.photographers) {
            const request = q.tags.includes(hashtag);
            if(request) {
                resultList.push(q);
            }
        }
        return displayPhotoInfos(resultList);
    })
    .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
}
fetchSomePhotos("events"); */


// On souhaite disposer d'une fonction qui va récupérer l'ensemble des hashtags existants
function getHashtags() {
    // On commence par récupérer la liste de tous les éléments de classe "hashtag"
    let allTags: NodeListOf<Element> = document.querySelectorAll(".hashtag");

    // On affiche le nombre de hashtags trouvés
    //console.log(allTags?.length + " hashtags found");

    // On veut les enregistrer dans une liste, pour cela on commence par créer ladite liste
    let taglist: any = [];

    // Comme il y a des hashtags qui se répètent, on veut les enregistrer dans la liste, mais une seule fois
    for (let i = 0; i<allTags?.length; i++) {

        // Parce qu'on s'intéresse uniquement au texte associé au hashtag, on prend chaque hashtag et on en tire le "textContent", qu'on convertit en minuscule
        let value = allTags[i].textContent.toLowerCase();

        // Est-ce que taglist intègre cette valeur ?
        if (!taglist.includes(value)) { // Si elle n'y est pas, on l'ajoute
            taglist.push(value);
        }
    }
    return console.log(taglist);
}


// Faire la liste des hashtags c'est pas tout, mais que veut-on faire avec ça?
// Déjà: quand on clique sur un hashtag on aimerait afficher uniquement les profils qui correspondent: c'est possible ça? Bah oui, mais faut le faire. DONC :
// Si je clique sur un hashtag, dans le menu en haut ou sur le profil d'un photographe, on récupère la valeur associée à ce hashtag
// Pour chaque profil de photographe, si le hashtag en question fait partie des hashtags de son profil, on display:block
// et sinon, on display:none
function getPhotographerHashtags() {
    console.log("prout");
    let photographerHastags: NodeListOf<Element> = document.querySelectorAll(".hashtag");
    for (let i = 0; i<photographerHastags.length; i++) {
        console.log(photographerHastags[i].parentNode.parentNode);
    }
    /* console.log(photographerHastags); */
}


// On veut attacher la propriété JS getPhotographerHashtags à tous les éléments concernés
function attachHashFunction() {
    let allTags: NodeListOf<Element> = document.querySelectorAll(".hashtag");
    let allProfiles = document.getElementsByTagName("article");
    console.log(allProfiles);
    //console.log(allTags?.length +  "hashtags found");
    for (let i=0; i<allTags?.length; i++) {
        //console.log(allTags);
        console.log("Le ID vaut: ",allTags[i]);
        allTags[i].setAttribute("onclick","getPhotographerHashtags();");
        allTags[i].addEventListener("click", function (event) {
            let eventTarget = event.target;
            //parentNode.parentNode.parentNode.attributes.id.value
            console.log("Event target", eventTarget);
        });
        //console.log(allTags[i].attributes);
    }
}