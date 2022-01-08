import { Photograph } from "./photograph.js";
import { Media } from "./media.js";
import { Modal } from "./modal.js";
// La classe GALLERY gère l'affichage d'une série d'éléments, soit les profils des différents photographes sur la page d'accueil, soit la liste des médias d'un photographe sur sa page dédiée.
// la classe "mère" va récupérer les données dans un fichier JSON, procédure commune aux deux types de galeries
// elle se décompose ensuite en deux sous-classes : une première qui va traiter le cas spécifique de la galerie photographes, et la seconde qui va s'occuper exclusivement des photos et vidéos d'un artiste donné.
class Gallery {
    // cette méthode, commune aux deux sous-classes, va récupérer les données du fichier JSON. 
    // Elle prend en entrée le type de données à chercher (photographers ou medias)
    // et renvoie la liste des résultats (mais on n'en a encore rien fait)
    async fetchDataAsync(type = ("photographers" || "media")) {
        if (type === "photographers" || type === "media") {
            try {
                const response = await fetch("./requirements/FishEyeData.json");
                const data = await response.json();
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
}
class GalleryOfPhotographs extends Gallery {
    //Cette méthode prend en entrée un objet "Galerie de photographes", cherche les données correspondantes dans le fichier json, et appelle la fonction showThemAll.
    displayGallery(type) {
        type.fetchDataAsync("photographers").then(results => this.showThem(results, "index"));
    }
    displayInfos(type) {
        type.fetchDataAsync("photographers").then(results => this.showThem(results, "profile"));
    }
    // Cette méthode prend en entrée le résultat de la requête asynchrone
    // et renvoie à partir de là l'ensemble des informations nécessaires à la réalisation :
    // - soit des cartes des photographes sur la page d'accueil si le type vaut "index"
    // - soit pour chaque photographe du bandeau d'informations de sa page de profile 
    showThem(results = [], type) {
        const parameters = new URLSearchParams(document.location.search.substring(1));
        const profileID = parameters.get("id");
        const tag = parameters.get("tag");
        // pour chaque élément de results, on créé un objet Photograph qui contient l'ensemble des informatiins dont on a besoin.
        for (const item of results) {
            const photograph = new Photograph(item.id, item.name, item.city, item.country, item.tags, item.tagline, item.price, item.portrait);
            if (type == "profile") {
                if (item.id == +profileID) {
                    return photograph.createPhotographProfile();
                }
            }
            else if (type == "index") {
                if (profileID === null) {
                    if (tag === null) {
                        photograph.createPhotographCard();
                    }
                    else if (photograph.tags.includes(tag)) {
                        photograph.createPhotographCard();
                    }
                }
                else if (photograph.id === +profileID) {
                    photograph.createPhotographCard();
                }
            }
        }
    }
    // cette méthode doit retrouver, à partir d'un simple id, les infos relatives à un photographe et créer l'objet associé.
    createPhotograph(id) {
        const type = new GalleryOfPhotographs;
        type.displayGallery(type);
        let photograph;
        type.fetchDataAsync("photographers").then(results => {
            for (const item of results) {
                if (item.id == id) {
                    console.log("item trouvé!");
                    photograph = new Photograph(+item.id, item.name, item.city, item.country, item.tags, item.tagline, +item.price, item.portrait);
                }
            }
            return photograph;
        });
    }
}
class GalleryOfMedias extends Gallery {
    //Cette méthode prend en entrée un objet "Galerie de médias", cherche les données correspondantes dans le fichier json, et appelle la fonction showThemAll.
    displayGallery(type) {
        type.fetchDataAsync("media").then(results => {
            this.showThemAll(results);
        });
    }
    // Cette méthode prend en entrée le résultat de la requête asynchrone
    // ...et renvoie à partir de ça l'ensemble des informations nécessaires, avec la condition "id page" = "id photographe"
    // Ce qu'on veut aussi, c'est qu'à chaque fois qu'on modifie le tri, la liste se mette à jour.
    showThemAll(results = []) {
        const parameters = new URLSearchParams(document.location.search.substring(1));
        const profileID = parameters.get("id");
        // on créé une liste contenant uniquement les résultats qui nous intéressent
        const list = [];
        for (const item of results) {
            if (item.photographerId == +profileID) {
                list.push(item);
            }
        }
        const selectTracker = document.getElementById("order-by");
        this.sortedList(list, selectTracker.value);
        selectTracker.addEventListener("change", () => this.showThemAll(results)); // Pour le event Listener, on relance cette méthode plutôt que la méthode "liste triée". A voir quel impact en termes de performance : les variables paramètres, profileID et la liste ne changent pas, seul l'ordre de la liste évolue.
    }
    sortedList(list, sortingStyle) {
        switch (sortingStyle) {
            case "popularity":
                list = this.sortByLikes(list);
                break;
            case "date":
                list = this.sortByDate(list);
                break;
            case "title":
                list = this.sortByName(list);
                break;
            default:
                console.error("Erreur lors du tri.");
        }
        // On efface le contenu déjà présent
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML = "";
        let howManyLikes = 0;
        const hasBeenLiked = [];
        // Pour chaque élément de la liste, on créé l'objet associé
        for (let i = 0; i < list.length; i++) {
            const media = new Media(list[i].id, list[i].photographerId, list[i].title, list[i].image, list[i].tags, list[i].likes, list[i].date, list[i].price);
            howManyLikes += list[i].likes;
            hasBeenLiked.push(0);
            media.createMedia();
            const mediaFigures = document.querySelectorAll(".media");
            mediaFigures.forEach(element => {
                element.addEventListener("click", (event) => {
                    // si une modale est déjà ouverte, on la ferme
                    const lightbox = document.querySelector(".lightbox-modal");
                    if (lightbox) {
                        lightbox.remove();
                    }
                    // puis on créé une modale ligthing modal
                    const mediaModal = new Modal(list[i].photographerId);
                    const modal = mediaModal.createMediaModal(list, i);
                    // et on masque le fond de la page
                    const body = document.querySelector("body");
                    body.setAttribute("class", "bg-opacity--full");
                    body.append(modal);
                    event.stopImmediatePropagation();
                });
            });
        }
        const bottomInfosLikes = document.getElementById("bottomInfosLikes");
        bottomInfosLikes.innerHTML = String(howManyLikes);
        const mediaLikes = document.querySelectorAll(".media-likes");
        let moreLikes = 0;
        mediaLikes.forEach((element, index) => {
            // on stocke le nombre de likes initial, de façon à limiter l'incrémentation à 1 même en cas de clics multiples
            const initialValue = +element.textContent;
            element.addEventListener("click", (event) => {
                //console.log("clicked on "+element.previousElementSibling.textContent);
                element.innerHTML = String(initialValue + 1); // + 1;
                hasBeenLiked[index] = 1;
                event.stopImmediatePropagation();
                moreLikes = hasBeenLiked.reduce((x, y) => x + y);
                bottomInfosLikes.innerHTML = String(howManyLikes + moreLikes);
            });
        });
        return list;
    }
    // Pour les trois méthodes ci-dessous, on prend en paramètre une liste (celle des résultats de la requête JSON), et on renvoit la liste triée : soit par nombre de likes, soit par titre, soit par date.
    // source : https://stackoverflow.com/a/19326174/15450868
    // inorganik
    // Cette fonction prend en entrée une liste et renvoie la liste triée par nombre de likes par ordre décroissant
    sortByLikes(list) {
        // "resultats" est un array d'objets, et on veut pouvoir trier les objets en fonction de la valeur d'une de leurs clés
        const byLikes = list.slice(0); // on copie la liste initiale
        byLikes.sort(function (a, b) {
            return b.likes - a.likes; // on trie la nouvelle liste par ordre décroissant
        });
        return byLikes;
    }
    // cette fonction prend en entrée une liste et renvoie la liste triée par ordre alphabétique croissant
    sortByName(list) {
        const byName = list.slice(0);
        byName.sort(function (a, b) {
            const x = a.title.toLowerCase();
            const y = b.title.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        return byName;
    }
    // cette fonction prend en entrée une liste de médias et renvoie la liste triée par ordre antichronologique
    sortByDate(list) {
        const byDate = list.slice(0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        byDate.sort((a, b) => {
            // pour trier les dates qui sont actuellement au format string "YYYY-MM-DD", on compare leur timestamp via un Date.parse(), sans changer le format de la variable.
            return Date.parse(b.date) - Date.parse(a.date);
        });
        return byDate;
    }
}
export { Gallery, GalleryOfPhotographs, GalleryOfMedias };
//# sourceMappingURL=gallery.js.map