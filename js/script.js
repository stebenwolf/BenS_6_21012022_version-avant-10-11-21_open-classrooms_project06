"use strict";
// On souhaite lire les infos d'un photographe.
// Le fichier JSON contient les infos suivantes:
/* "name": "Mimi Keel",
      "id": 243,
      "city": "London",
      "country": "UK",
      "tags": ["portrait", "events", "travel", "animals"],
      "tagline": "Voir le beau dans le quotidien",
      "price": 400,
      "portrait": "MimiKeel.jpg"
*/
/* const photographerInfos = {
    getInfo(id: number, type: string) {
        return fetch("../requirements/FishEyeData.json")
            .then(response => response.json())
            .then(data => {
                data.photographers[id][`${type}`];
            })
            .catch(error => {
                console.error("boulette et crotte de biquette, erreur: ", error)
            })
    }
}; */
document.addEventListener('DOMContentLoaded', () => {
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
            return displayPhotoInfos(resultList);
        })
            .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
    }
    fetchSomePhotos("events");
});
/*
function displayInfos() {
    let photographersName: NodeListOf<Element> = document.querySelectorAll(".photographer-name");

    return photographersName[0].innerHTML = photographerInfos.getInfo(0, "name");
} */
/* photographerInfos.getInfo(0, "name");
photographerInfos.getInfo(0, "city"); */
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
//# sourceMappingURL=script.js.map