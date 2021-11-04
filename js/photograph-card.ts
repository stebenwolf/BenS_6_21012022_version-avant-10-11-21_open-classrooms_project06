// on voudrait pouvoir obtenir facilement une "carte photographe" pour la page d'accueil, ainsi qu'une "page photographe" pour chaque photographe, et sur cette "page photographe" on souhaite disposer d'un module media qui va gérer les photos et vidéos du/de la photographe.
import {Photograph} from './photograph.js';

interface PhotographCard {
}

class PhotographCard {
    constructor() {
    }

    createPhotographCard(photograph: Photograph) {
      if(document.querySelector(".photograph-cards")) {
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
        linkArticle.href = "./photograph.html?id="+photograph.id;
        imgArticle.className = "photograph-ID shadow";
        titleArticle.className = "photographer-name";
        pLocationArticle.className = "location";
        pDescriptionArticle.className = "description";
        pPriceArticle.className = "price";
        tagsArticle.className = "tags";
        for (let i=0; i<photograph.tags.length; i++) {
            const tagsLiArticle = document.createElement("li");
            tagsLiArticle.className = "hashtag font-small";
            tagsLiArticle.innerHTML = photograph.tags[i];
            tagsUlArticle.append(tagsLiArticle);
        }

        // Sélectionner les données pour les insérer dans les éléments créés
        photoArticle.setAttribute("id", String(photograph.id));
        imgArticle.src = "./img/photograph-ID/"+photograph.portrait;
        titleArticle.innerHTML = photograph.name;
        pLocationArticle.innerHTML = photograph.city + ", " + photograph.country;
        pDescriptionArticle.innerHTML = photograph.tagline;
        pPriceArticle.innerHTML = photograph.price + "&euro;/jour";
            
        // attacher les éléments au bon endroit
        photoSection.append(photoArticle);
        pictureArticle.append(imgArticle);
        linkArticle.append(pictureArticle, titleArticle);
        tagsArticle.append(tagsUlArticle);
        photoArticle.append(
            linkArticle, 
            pLocationArticle, 
            pDescriptionArticle, 
            pPriceArticle,
            tagsArticle
        );
    }
}
}


export {PhotographCard}