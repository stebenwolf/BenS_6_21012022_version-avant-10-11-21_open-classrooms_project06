import { Photograph } from "./photograph.js";
/* Fonction assez "lourde" qui va:
1/ lire le document JSON
2/ créer les différents composants du profil photographe
3/ y insérer les données du fichier JSON
4/ les agencer ensemble
*/
// Cette fonction va chercher les informations photographes du fichier JSON et appeler la fonction displayPhoto 
function fetchPhotoInfos() {
    fetch("../requirements/FishEyeData.json")
        .then(response => response.json())
        .then(data => displayPhotoInfos(data.photographers))
        .catch(error => console.error("boulette de bique, erreur!!! ", error));
}
// Cette fonction affiche tous les profils de photographes de la liste "data"
function displayPhotoInfos(data) {
    for (const q of data) {
        //on sélectionne le conteneur
        const photoSection = document.querySelector(".photograph-cards");
        //on créé tous les éléments du profil
        const photoArticle = document.createElement("article");
        const linkArticle = document.createElement("a");
        const pictureArticle = document.createElement("picture");
        const imgArticle = document.createElement("img");
        const titleArticle = document.createElement("h3");
        const pLocationArticle = document.createElement("p");
        const pDescriptionArticle = document.createElement("p");
        const pPriceArticle = document.createElement("p");
        const tagsArticle = document.createElement("div");
        const tagsUlArticle = document.createElement("ul");
        // on créé les classes et propriétés associées
        photoArticle.className = "photograph-card font-small";
        linkArticle.href = "./photograph-01_mimi-keel.html";
        imgArticle.className = "photograph-ID shadow";
        titleArticle.className = "photographer-name";
        pLocationArticle.className = "location";
        pDescriptionArticle.className = "description";
        pPriceArticle.className = "price";
        tagsArticle.className = "tags";
        for (let i = 0; i < q.tags.length; i++) {
            const tagsLiArticle = document.createElement("li");
            tagsLiArticle.className = "hashtag font-small";
            tagsLiArticle.innerHTML = q.tags[i];
            tagsUlArticle.append(tagsLiArticle);
        }
        // Sélectionner les données pour les insérer dans les éléments créés
        photoArticle.setAttribute("id", q.id);
        imgArticle.src = "./img/photograph-ID/" + q.portrait;
        titleArticle.innerHTML = q.name;
        pLocationArticle.innerHTML = q.city + ", " + q.country;
        pDescriptionArticle.innerHTML = q.tagline;
        pPriceArticle.innerHTML = q.price + "&euro;/jour";
        // attacher les éléments au bon endroit
        photoSection.append(photoArticle);
        pictureArticle.append(imgArticle);
        linkArticle.append(pictureArticle, titleArticle);
        tagsArticle.append(tagsUlArticle);
        photoArticle.append(linkArticle, pLocationArticle, pDescriptionArticle, pPriceArticle, tagsArticle);
    }
}
fetchPhotoInfos();
// Quand on sélectionne un hashtag, cette fonction renvoie les profils associés.
function fetchSomePhotosHere(hashtag) {
    const resultList = [];
    fetch("../requirements/FishEyeData.json")
        .then(response => response.json())
        .then(data => {
        for (const q of data.photographers) {
            const request = q.tags.includes(hashtag);
            if (request) {
                resultList.push(q);
            }
        }
        return displayPhotoInfos(resultList);
    })
        .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
}
fetchSomePhotos("events");
// Fin de la fonction "globale"
// On souhaite disposer d'une fonction qui va récupérer l'ensemble des hashtags existants
function getHashtags() {
    // On commence par récupérer la liste de tous les éléments de classe "hashtag"
    let allTags = document.querySelectorAll(".hashtag");
    // On affiche le nombre de hashtags trouvés
    //console.log(allTags?.length + " hashtags found");
    // On veut les enregistrer dans une liste, pour cela on commence par créer ladite liste
    let taglist = [];
    // Comme il y a des hashtags qui se répètent, on veut les enregistrer dans la liste, mais une seule fois
    for (let i = 0; i < allTags?.length; i++) {
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
    let photographerHastags = document.querySelectorAll(".hashtag");
    for (let i = 0; i < photographerHastags.length; i++) {
        console.log(photographerHastags[i].parentNode.parentNode);
    }
    /* console.log(photographerHastags); */
}
// On veut attacher la propriété JS getPhotographerHashtags à tous les éléments concernés
function attachHashFunction() {
    let allTags = document.querySelectorAll(".hashtag");
    let allProfiles = document.getElementsByTagName("article");
    console.log(allProfiles);
    //console.log(allTags?.length +  "hashtags found");
    for (let i = 0; i < allTags?.length; i++) {
        //console.log(allTags);
        console.log("Le ID vaut: ", allTags[i]);
        allTags[i].setAttribute("onclick", "getPhotographerHashtags();");
        allTags[i].addEventListener("click", function (event) {
            let eventTarget = event.target;
            //parentNode.parentNode.parentNode.attributes.id.value
            console.log("Event target", eventTarget);
        });
        //console.log(allTags[i].attributes);
    }
}
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
// Création d'un objet "Photographe"
/*"photographers": [
        {
          "name": "Mimi Keel",
          "id": 243,
          "city": "London",
          "country": "UK",
          "tags": ["portrait", "events", "travel", "animals"],
          "tagline": "Voir le beau dans le quotidien",
          "price": 400,
          "portrait": "MimiKeel.jpg"
        }
*/
let examplePhotograph = new Photograph(215, "Bob", "Paris", "US", ["fun", "not fun"], "always ever", 400, "mimi");
console.log(examplePhotograph.getCity());
async function fetchDataAsync(type = ("photographers" || "media")) {
    if (type === "photographers" || type === "media") {
        try {
            let response = await fetch("../requirements/FishEyeData.json");
            let data = await response.json();
            /* console.log("response: ",response);
            console.log("data : ",data);
            console.log("data.photogr", data[type]); */
            return data[type];
        }
        catch (error) {
            console.error("Erreur dans la fonction fetchDataAsync : ", error);
        }
    }
    else {
        return console.log("Fonction fetchDataAsync : Argument invalide");
    }
}
fetchDataAsync("photographers").then(function (resultats) {
    createPhotograph(resultats);
});
function createPhotograph(resultats) {
    console.log("Create photograph input: ", resultats);
    for (let item of resultats) {
        const photograph_infos = new Photograph(item.id, item.name, item.city, item.country, item.tags, item.tagline, item.price, item.portrait);
        console.log("Create photographs output :", photograph_infos);
        console.log(photograph_infos.getName());
        console.log(resultats[item].name);
    }
}
async function fetchPhotographerAsync() {
    try {
        let response = await fetch("../requirements/FishEyeData.json");
        let data = await response.json();
        return data.photographers;
    }
    catch (error) {
        console.error("Erreur dans la fonction fetchPhotographerAsync : ", error);
    }
}
function fetchSomePhotos(hashtag) {
    const resultList = [];
    fetch("../requirements/FishEyeData.json")
        .then(response => response.json())
        .then(data => {
        for (const q of data.photographers) {
            const request = q.tags.includes(hashtag);
            if (request) {
                resultList.push(q);
            }
        }
        //return displayPhotoInfos(resultList);
    })
        .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
}
//# sourceMappingURL=script.js.map