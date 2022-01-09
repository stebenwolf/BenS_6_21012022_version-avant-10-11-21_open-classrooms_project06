import { Modal } from "./modal.js";
// La classe photographe gère l'affichage et la mise en forme des éléments spécifiques aux photographes. A partir d'un objet Photograph, on peut utiliser deux méthodes :
// une première méthode qui génère la "carte" photographe (celle qu'on verra sur la page d'accueil)
// une seconde qui va générer le bandeau sur sa page de profil
class Photograph {
    constructor(id, name, city, country, tags, tagline, price, portrait) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
    // on souhaite maintenant pouvoir générer très facilement une carte photographe pour la page d'accueil, qui reprend donc les différents éléments et les agence comme il faut.
    createPhotographCard() {
        if (document.querySelector(".photograph-cards")) {
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
            linkArticle.href = "./photograph.html?id=" + this.id;
            imgArticle.className = "photograph-ID shadow";
            imgArticle.alt = this.name;
            titleArticle.className = "photographer-name";
            pLocationArticle.className = "location";
            pDescriptionArticle.className = "description";
            pPriceArticle.className = "price";
            tagsArticle.className = "tags";
            for (let i = 0; i < this.tags.length; i++) {
                const tagsLiArticle = document.createElement("li");
                tagsLiArticle.className = "hashtag font-small";
                tagsLiArticle.innerHTML = "<a href=\"?tag=" + this.tags[i] + "\">" + this.tags[i] + "</a>";
                tagsUlArticle.append(tagsLiArticle);
            }
            // Sélectionner les données pour les insérer dans les éléments créés
            photoArticle.setAttribute("id", String(this.id));
            imgArticle.src = "./img/photograph-ID/" + this.portrait;
            titleArticle.innerHTML = this.name;
            pLocationArticle.innerHTML = this.city + ", " + this.country;
            pDescriptionArticle.innerHTML = this.tagline;
            pPriceArticle.innerHTML = this.price + "&euro;/jour";
            // attacher les éléments au bon endroit
            photoSection.append(photoArticle);
            pictureArticle.append(imgArticle);
            linkArticle.append(pictureArticle, titleArticle);
            tagsArticle.append(tagsUlArticle);
            photoArticle.append(linkArticle, pLocationArticle, pDescriptionArticle, pPriceArticle, tagsArticle);
        }
    }
    //on souhaite disposer d'une deuxième méthode, qui elle génère le bandeau de présentation du photographe sur sa page de profil.
    createPhotographProfile() {
        if (document.querySelector(".photograph-profile")) {
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
            for (let i = 0; i < this.tags.length; i++) {
                const tagsLiArticle = document.createElement("li");
                tagsLiArticle.className = "hashtag font-small";
                tagsLiArticle.innerHTML = this.tags[i];
                tagsUlArticle.append(tagsLiArticle);
            }
            contactArticle.className = "photograph-contact";
            picArticle.className = "photograph-pic";
            imgArticle.className = "photograph-ID profile-ID shadow";
            imgArticle.alt = this.name;
            // Sélectionner les données pour les insérer dans les éléments créés
            titleArticle.innerHTML = this.name;
            buttonArticle.innerHTML = "Contactez-moi";
            pLocationArticle.innerHTML = this.city + ", " + this.country;
            pTaglineArticle.innerHTML = this.tagline;
            imgArticle.src = "./img/photograph-ID/" + this.portrait;
            // ajout : un petit bandeau en bas de page qui indique le nombre total de likes et le TJ photographe
            const bottomInfos = document.createElement("div");
            const bottomInfosLikes = document.createElement("span");
            const bottomInfosTJ = document.createElement("span");
            bottomInfos.id = "bottomInfos";
            bottomInfosLikes.id = "bottomInfosLikes";
            bottomInfosTJ.id = "bottomInfosTJ";
            bottomInfosLikes.innerHTML = "";
            bottomInfosTJ.innerHTML = this.price + "&euro; / jour";
            const body = document.querySelector("body");
            bottomInfos.append(bottomInfosLikes, bottomInfosTJ);
            body.append(bottomInfos);
            // attacher les éléments au bon endroit
            photoSection.append(photoArticle);
            photoArticle.append(divArticle, contactArticle, picArticle);
            divArticle.append(divNameArticle, pLocationArticle, pTaglineArticle, tagsArticle);
            divNameArticle.append(titleArticle, buttonArticle);
            tagsArticle.append(tagsUlArticle);
            picArticle.append(pictureArticle);
            pictureArticle.append(imgArticle);
            pictureArticle.append(imgArticle);
            // on ajoute la méthode pour lancer la modale contact
            buttonArticle.addEventListener("click", () => {
                const formModal = document.querySelector("#form-modal");
                if (formModal) {
                    formModal.remove();
                }
                const contactModal = new Modal(this.id);
                const modal = contactModal.createContactModal(this.name);
                const html = document.querySelector("html");
                const body = document.querySelector("body");
                body.setAttribute("class", "bg-opacity");
                html.append(modal);
            });
        }
    }
}
// On exporte le module
export { Photograph };
//# sourceMappingURL=photograph.js.map