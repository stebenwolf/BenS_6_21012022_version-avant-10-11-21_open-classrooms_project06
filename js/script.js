import { Photograph } from "./photograph.js";
import { PhotographCard } from "./photograph-card.js";
import { PhotographProfile } from "./photograph-profile.js";
// Qu'est-ce qu'on souhaite faire, et pourquoi ?
/* On veut créer un objet "photographe" qui va nous permettre en une commande d'accéder à une valeur donnée. Par exemple, photographer.id renvoie l'ID du photograph, photographer.name renvoie le nom du photographe, etc.
*/
/* Objets à créer :
* un objet "Photographe"
* un objet "carte photographe" pour la page d'accueil, avec les différents composants: image, titre (le nom du photographe), sous-titre, prix, ville, tags...
* un objet "Media" avec les différentes photo d'un photographe; l'ID de la photo, l'ID du photographe, le titre de la photo, la date de prise de vue, le prix, etc.
*/
// Fonction asynchrone qui prend en input le type de données (photographe ou média), et renvoie les données JSON correspondantes.
async function fetchDataAsync(type = ("photographers" || "media")) {
    if (type === "photographers" || type === "media") {
        try {
            let response = await fetch("../requirements/FishEyeData.json");
            let data = await response.json();
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
// Fonction qui créé les Photographes. Prend en entrée un tableau de résultats et renvoie un objet photographe.
function createPhotograph(item) {
    return new Photograph(item.id, item.name, item.city, item.country, item.tags, item.tagline, item.price, item.portrait);
}
// A partir des résultats de la requête asynchrone, on créé des profils photographes. 
/* fetchDataAsync("photographers").then(function(resultats) {
    for (let item of resultats) {
        const photograph = createPhotograph(item);
        new PhotographCard().createPhotographCard(photograph);
    }
}); */
let parameters = new URLSearchParams(document.location.search.substring(1));
let profileID = parameters.get("id");
let tag = parameters.get("tag");
fetchDataAsync("photographers").then(function (resultats) {
    for (let item of resultats) {
        const photograph = createPhotograph(item);
        if (profileID === null) {
            if (tag === null) {
                new PhotographCard().createPhotographCard(photograph);
            }
            else if (photograph.tags.includes(tag)) {
                new PhotographCard().createPhotographCard(photograph);
            }
        }
        else if (photograph.id === +profileID) {
            new PhotographCard().createPhotographCard(photograph);
        }
    }
});
fetchDataAsync("photographers").then(function (resultats) {
    for (let item of resultats) {
        const photograph = createPhotograph(item);
        new PhotographProfile().createPhotographProfile(photograph);
    }
});
//# sourceMappingURL=script.js.map