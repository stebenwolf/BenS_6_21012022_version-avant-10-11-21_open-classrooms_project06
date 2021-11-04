import {Photograph} from './photograph.js';

interface PhotographProfile {
}

class PhotographProfile {
    constructor() {
    }

    /* <section class="photograph-profile">
        <article class="photograph-pres">
            <div class="photograph-description">
                <div class="photographer-name-profile">
                    <h1 class="photographer-name">Mimi Keel</h1>
                    <button class="btn-contact">Contactez-moi</button>
                </div>
                <p class="location">London, UK</p>
                <p class="tagline">Voir le beau dans le quotidien</p>
                <div class="tags">
                    <ul>
                        <li class="hashtag font-small">portrait</li>
                        <li class="hashtag font-small">events</li>
                        <li class="hashtag font-small">travel</li>
                        <li class="hashtag font-small">animals</li>
                    </ul>
                </div>
            </div>
            <div class="photograph-contact">
            </div>
            <div class="photograph-pic">
                <picture>
                    <img class="photograph-ID shadow" src="./img/photograph-ID/MimiKeel.jpg" alt="Mimi Keel - Profile pic">
                </picture>
            </div>
        </article>
    </section>
    */

    createPhotographProfile(photograph: Photograph) {
        if(document.querySelector(".photograph-profile")) {

            //on sélectionne le conteneur
            const photoSection = document.querySelector(".photograph-profile");

            //on créé tous les éléments du profil
            const photoArticle = document.createElement("article");
            const divArticle = document.createElement("div");
            const divNameArticle = document.createElement("div");
            const titleArticle = document.createElement("h1");
            const buttonArticle = document.createElement("button");
            const pLocationArticle = document.createElement("p");
            const pTaglineArticle = document.createElement("p");
            const tagsArticle = document.createElement("div");
            const tagsUlArticle = document.createElement("ul");
            const contactArticle = document.createElement("div");
            const picArticle = document.createElement("div");
            const pictureArticle = document.createElement("picture");
            const imgArticle = document.createElement("img");
            
            // on créé les classes et propriétés associées
            photoArticle.className = "photograph-pres";
            divArticle.className = "photograph-description";
            divNameArticle.className = "photographer-name-profile";
            titleArticle.className = "photographer-name";
            buttonArticle.className = "btn-contact";
            pLocationArticle.className = "location";
            pTaglineArticle.className = "description";
            tagsArticle.className = "tags";
            for (let i=0; i<photograph.tags.length; i++) {
                const tagsLiArticle = document.createElement("li");
                tagsLiArticle.className = "hashtag font-small";
                tagsLiArticle.innerHTML = photograph.tags[i];
                tagsUlArticle.append(tagsLiArticle);
            }
            contactArticle.className = "photograph-contact";
            picArticle.className = "photograph-pic";
            imgArticle.className = "photograph-ID shadow";        

            // Sélectionner les données pour les insérer dans les éléments créés
            titleArticle.innerHTML = photograph.name;
            buttonArticle.innerHTML = "Contactez-moi";
            pLocationArticle.innerHTML = photograph.city + ", " + photograph.country;
            pTaglineArticle.innerHTML = photograph.tagline;
            imgArticle.src = "./img/photograph-ID/"+photograph.portrait;
        

            // attacher les éléments au bon endroit
            photoSection.append(photoArticle);
                photoArticle.append(
                    divArticle,
                    contactArticle,
                    picArticle
                );
                    divArticle.append(
                        divNameArticle,
                        pLocationArticle,
                        pTaglineArticle,
                        tagsArticle
                    );
                        divNameArticle.append(
                            titleArticle,
                            buttonArticle
                        );
                        tagsArticle.append(tagsUlArticle);

                    picArticle.append(pictureArticle);
                        pictureArticle.append(imgArticle);
                            pictureArticle.append(imgArticle);
        }
    }
}

export {PhotographProfile}