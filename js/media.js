class Media {
    constructor(id, photographerId, title, image, tags, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
    createMedia(media) {
        if (document.querySelector(".gallery")) {
            // on sélectionne le conteneur
            const gallerySection = document.querySelector(".gallery");
            // on créé les éléments de la galerie
            const figureZone = document.createElement("figure");
            let mediaZone;
            const mediaInfos = document.createElement("figcaption");
            // on doit distinguer le cas où l'on a une video de celui où l'on a une image
            if (media.image.includes(".mp4")) {
                mediaZone = document.createElement("video");
                mediaZone.setAttribute("width", "150px");
                mediaZone.setAttribute("height", "150px");
                mediaZone.setAttribute("controls", "true");
                const videoSourceZone = document.createElement("source");
                videoSourceZone.type = "video/mp4";
                videoSourceZone.src = "./img/" + media.photographerId + "/" + media.image;
                mediaZone.append(videoSourceZone);
            }
            else {
                mediaZone = document.createElement("picture");
                const imgZone = document.createElement("img");
                imgZone.src = "./img/" + media.photographerId + "/" + media.image;
                mediaZone.append(imgZone);
            }
            // on créé les classes et propriétés associées
            //mediaZone.className = "gallery_zone";
            figureZone.className = "vignette";
            figureZone.setAttribute("id", String(media.id));
            // on intègre les données récupérées
            mediaInfos.innerHTML = "Likes: " + media.likes
                + ",<br>date: " + media.date
                + ",<br>price : " + media.price
                + ",<br>title : " + media.title;
            // on attache les éléments au bon endroit
            gallerySection.append(figureZone);
            figureZone.append(mediaZone, mediaInfos);
        }
    }
    openModal(media) {
        const targetFigure = document.getElementById(String(media.id));
        //console.log("targetFig : ", targetFigure);
        targetFigure.addEventListener("click", function () {
            console.log("yay!" + media.id);
            createModalFig(media);
            closeModal();
        });
    }
}
// La "lightbox modal" doit contenir les éléments suivants
/*
- Un cadre en fond blanc
- L'image sélectionnée, en gros plan
- Le titre du média associé
- Un bouton "Fermer"
- Un bouton avant
- Un bouton après
*/
function createModalFig(media) {
    const modalSection = document.getElementById("media-modal");
    modalSection.removeAttribute("class");
    const modalFigure = document.querySelector(".media-modal--figure");
    let modalMediaZone;
    if (media.image.includes(".mp4")) {
        modalMediaZone = document.createElement("video");
        modalMediaZone.setAttribute("width", "150px");
        modalMediaZone.setAttribute("height", "150px");
        modalMediaZone.setAttribute("controls", "true");
        const modalVideoSourceZone = document.createElement("source");
        modalVideoSourceZone.type = "video/mp4";
        modalVideoSourceZone.src = "./img/" + media.photographerId + "/" + media.image;
        modalMediaZone.append(modalVideoSourceZone);
    }
    else {
        modalMediaZone = document.createElement("picture");
        const modalImgZone = document.createElement("img");
        modalImgZone.src = "./img/" + media.photographerId + "/" + media.image;
        modalMediaZone.append(modalImgZone);
    }
    modalMediaZone.setAttribute("id", "modalMediaZone");
    const modalFigCaption = document.querySelector(".media-modal--figcaption");
    modalFigCaption.innerHTML = "blahblahblah" + media.id + "<br>TEST";
    modalFigure.append(modalMediaZone);
}
function closeModal() {
    const figModal = document.getElementById("media-modal");
    if (figModal) {
        const figCloseModal = document.querySelector(".modal-close");
        const modalMediaZone = document.getElementById("modalMediaZone");
        figCloseModal.addEventListener("click", function () {
            figModal.setAttribute("class", "hidden");
            modalMediaZone.remove(); // On supprime le média généré, pour pouvoir en générer un nouveau par la suite
        });
    }
}
export { Media };
//# sourceMappingURL=media.js.map