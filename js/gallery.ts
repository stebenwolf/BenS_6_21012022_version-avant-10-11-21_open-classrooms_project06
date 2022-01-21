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
    async fetchDataAsync(type: string = ("photographers" || "media")) {
        if(type === "photographers" || type === "media") {
            try {
                const response = await fetch("./requirements/FishEyeData.json");
                const data = await response.json();
                return data[type];
            }
            catch(error) {
                console.error("Erreur dans la fonction fetchDataAsync : ", error);
            }
        } else {
            return console.log("Fonction fetchDataAsync : Argument invalide");
        }
    }
}

class GalleryOfPhotographs extends Gallery {

    //Cette méthode prend en entrée un objet "Galerie de photographes", cherche les données correspondantes dans le fichier json, et appelle la fonction showThemAll.
    displayGallery() {
        this.fetchDataAsync("photographers")
        .then(results => this.showThem(results, "index"))
        .catch(error => {console.log(error);});
    }

    displayInfos() {
        this.fetchDataAsync("photographers")
        .then(results => this.showThem(results, "profile"))
        .catch(error => {console.log(error);});
    }

    // Cette méthode prend en entrée le résultat de la requête asynchrone
    // et renvoie à partir de là l'ensemble des informations nécessaires à la réalisation :
    // - soit des cartes des photographes sur la page d'accueil si le type vaut "index"
    // - soit pour chaque photographe du bandeau d'informations de sa page de profile 
    showThem(results: Photograph[] = [], type: "index" | "profile") {
        const parameters = new URLSearchParams(document.location.search.substring(1));
        const profileID = parameters.get("id");
        const tag = parameters.get("tag");
        const allHashtags: Array<string> = [];

        // pour chaque élément de results, on créé un objet Photograph qui contient l'ensemble des informations dont on a besoin.
                  
        for (const item of results) {
            const photograph = new Photograph(
                item.id,
                item.name,
                item.city,
                item.country,
                item.tags,
                item.tagline,
                item.price,
                item.portrait
            );

            // ici on fait la liste de tous les hashtags des photographes
            for (const thatTag of item.tags) {
                if (!allHashtags.includes(thatTag)) {
                    allHashtags.push(thatTag);
                }
            }
            
            if (type == "profile") {
                if(item.id == +profileID) {
                    return photograph.createPhotographProfile();
                }
            } else if (type == "index") {
                if(profileID === null) {
                    if (tag === null) {
                        photograph.createPhotographCard();
                    } else if (photograph.tags.includes(tag)) {
                        photograph.createPhotographCard();
                        // si l'on veut mettre en valeur le tag actuellement sélectionné 
                        /* const redTags = document.querySelectorAll(".hashtag");
                        redTags.forEach(element => {
                            if (element.textContent == tag) {
                                element.className = "hashtag font-small hashtagHovered";
                            }
                        }) */
                    }
                } else if (photograph.id === +profileID) {
                    photograph.createPhotographCard();
                }
            }
        }
        
        // on va créer à présent la navigation qui sera intégrée sur la page d'accueil
        const header = document.querySelector("header");
        const nav = document.createElement("nav");
        nav.setAttribute("aria-label", "photographer categories");
        const navUl = document.createElement("ul");
        let navLi;

        for (const item of allHashtags) {
            navLi = document.createElement("li");
            if (item == tag) {
                navLi.className = "hashtag font-small hashtagHovered";
            } else {
                navLi.className = "hashtag font-small";
            }
            const navLiLink = document.createElement("a");
            
            navLiLink.setAttribute("href","?tag="+item);
            navLiLink.textContent = item.charAt(0).toUpperCase() + item.slice(1);
            navLi.append(navLiLink);
            navUl.append(navLi);
        }
        nav.append(navUl);

        const h2title = document.createElement("h2");
        h2title.className = 'red-font';
        h2title.textContent = "Nos photographes";

        header.append(nav, h2title);
    }

    // cette méthode doit retrouver, à partir d'un simple id, les infos relatives à un photographe et créer l'objet associé.
    createPhotograph(id: number) {

        const type = new GalleryOfPhotographs;
        type.displayGallery()
        let photograph: Photograph;
        
        // on cherche le type de données 'photographes' et on créé pour chaque résultat un objet photographe contenant toutes les informations associées
        type.fetchDataAsync("photographers")
        .then(results => {
            for(const item of results) {
                if (item.id == id) {
                    console.log("item trouvé!");
                    photograph = new Photograph(
                        +item.id,
                        item.name,
                        item.city,
                        item.country,
                        item.tags,
                        item.tagline,
                        +item.price,
                        item.portrait
                    );
                }
            }
            return photograph;
        })
        .catch(error => {console.log(error);});
    }
}


class GalleryOfMedias extends Gallery {

    //Cette méthode prend en entrée un objet "Galerie de médias", cherche les données correspondantes dans le fichier json, et appelle la fonction showThemAll.
    displayGallery() {
        this.fetchDataAsync("media")
        .then(results => {
            this.showThemAll(results);
        })
        .catch(error => {console.log(error);});
    }

    // Cette méthode prend en entrée le résultat de la requête asynchrone
    // ...et renvoie à partir de ça l'ensemble des informations nécessaires, avec la condition "id page" = "id photographe"
    // Ce qu'on veut aussi, c'est qu'à chaque fois qu'on modifie le tri, la liste se mette à jour.
    showThemAll(results: Media[] = []) {
    
        const parameters = new URLSearchParams(document.location.search.substring(1));
        const profileID = parameters.get("id");

        // on créé une liste contenant uniquement les résultats qui nous intéressent
        const list:Array<Media> = [];
        for (const item of results) {
            if (item.photographerId == +profileID) {
                list.push(item);
            }
        }
                
        const selectTracker = <HTMLInputElement>document.getElementById("order-by");
        this.sortedList(list, selectTracker.value);
        selectTracker.addEventListener("change", () => this.showThemAll(results)); // Pour le event Listener, on relance cette méthode plutôt que la méthode "liste triée". A voir quel impact en termes de performance : les variables paramètres, profileID et la liste ne changent pas, seul l'ordre de la liste évolue.
    }

    // cette méthode prend en entrée une liste de médias (extraite du fichier JSON) et un mode de tri (obtenu via le menu déroulant). Elle renvoie la liste médias triée
    // la méthode est asynchrone car on souhaite que l'ensemble des calculs aient été effectués, notamment au niveau du nombre total de likes.
    async sortedList(list: Media[], sortingStyle: string) {

        //on commence par identifier le type de liste qu'on souhaite afficher : par nombre de likes, par date de prise de vue, ou par nom (ordre alphabétique)
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
        
        // On efface ensuite le contenu déjà présent
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML="";
        gallerySection.setAttribute("role","group");

        // comme on souhaite connaître le nombre total de likes des photos, on va l'enregistrer dans une variable dédiée. 
        let howManyLikes = 0;
        // on va également créer une liste, et pour chaque photo on enregistre si elle a été likée (1) ou non (0), puisqu'on ne peut liker une photo qu'une fois.
        const hasBeenLiked: Array<number> = [];
        
        // Pour chaque élément de la liste, on créé l'objet associé
        for (let i=0;i<list.length;i++) {
            
            // on créé notre objet Media avec les informations nécessaires
            const media = new Media(list[i].id, 
                list[i].photographerId, 
                list[i].title, 
                list[i].image, 
                list[i].tags, 
                list[i].likes, 
                list[i].date, 
                list[i].price);

            // le nombre total de likes est calculé au fur et à mesure
            howManyLikes += list[i].likes;
            // et pour chaque élément de la liste, on définit la valeur "likée" sur 0.
            hasBeenLiked.push(0);
            
            media.createMedia().setAttribute("role","figure");
            
            
            const mediaFigures = document.querySelectorAll(".media");
            mediaFigures.forEach(element => {
                element.setAttribute("aria-posinset",String(i));
                element.setAttribute("tabindex",String(0));

                function openLightBox(event: Event) {
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
                }

                element.addEventListener("click", openLightBox);
                element.addEventListener(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    "keydown", (event : any) => {
                        if (event.code === "Enter") {
                            openLightBox(event);
                        }
                    }
                );
            });
        }

        // ici on créé un bandeau visible sur desktop qui contient le nombre total de likes d'un photographe, ainsi que son TJ
        const getBottomInfos = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(document.getElementById("bottomInfosLikes"));
                }, 100);
            })
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bottomInfosLikes: HTMLElement | any = await getBottomInfos();
        bottomInfosLikes.innerHTML = "";
        bottomInfosLikes.insertAdjacentHTML("afterbegin",String(howManyLikes));
        
        // on veut également que le nombre de likes augmente lorsqu'on like une photo
        const mediaLikes = document.querySelectorAll(".media-likes");
        let moreLikes = 0;

        mediaLikes.forEach((element, index) => {
            // on stocke le nombre de likes initial, de façon à limiter l'incrémentation à 1 même en cas de clics multiples
            const initialValue = list[index].likes;
            element.innerHTML = initialValue + "<span class=\"hearts\">&#9825;</span>";

            const iLikeThat = () => {
                if (hasBeenLiked[index] == 0) {
                    const myHeartIsFullOfLove = "<span class=\"hearts\">&#9829;</span>";
                    element.innerHTML =  String(initialValue + 1) + myHeartIsFullOfLove;
                    hasBeenLiked[index] = 1;
                    
                    moreLikes = hasBeenLiked.reduce((x: number, y:number) => x + y);
                    bottomInfosLikes.innerHTML = String(howManyLikes + moreLikes);
                    element.removeEventListener("click", iLikeThat);
                } 
            }
                    
            element.addEventListener("click", iLikeThat);         
        });
        return list;
    }

    // Pour les trois méthodes ci-dessous, on prend en paramètre une liste (celle des résultats de la requête JSON), et on renvoit la liste triée : soit par nombre de likes, soit par titre, soit par date.

    // source : https://stackoverflow.com/a/19326174/15450868
    // inorganik

    // Cette fonction prend en entrée une liste et renvoie la liste triée par nombre de likes par ordre décroissant
    sortByLikes(list: Array<Media>) {
        // "resultats" est un array d'objets, et on veut pouvoir trier les objets en fonction de la valeur d'une de leurs clés
        const byLikes = list.slice(0); // on copie la liste initiale
        byLikes.sort(function(a: {likes : number }, b: {likes : number }) {
            return b.likes - a.likes; // on trie la nouvelle liste par ordre décroissant
        });
        return byLikes;
    }

    // cette fonction prend en entrée une liste et renvoie la liste triée par ordre alphabétique croissant
    sortByName(list: Array<Media>) {
        const byName = list.slice(0);
        byName.sort(function(a: {title: string}, b: {title: string}) {
            const x = a.title.toLowerCase();
            const y = b.title.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        return byName;
    }

    // cette fonction prend en entrée une liste de médias et renvoie la liste triée par ordre antichronologique
    sortByDate(list: Media[]): Media[] {
        const byDate = list.slice(0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        byDate.sort((a: any, b: any) => {
            // pour trier les dates qui sont actuellement au format string "YYYY-MM-DD", on compare leur timestamp via un Date.parse(), sans changer le format de la variable.
            return Date.parse(b.date) - Date.parse(a.date);
        });
        return byDate;
    }
}

export {Gallery, GalleryOfPhotographs, GalleryOfMedias}