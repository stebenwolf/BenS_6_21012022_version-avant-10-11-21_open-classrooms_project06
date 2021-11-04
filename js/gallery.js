class Gallery {
    constructor() {
    }
    createGallery(media) {
        if (document.querySelector(".gallery")) {
            // on sélectionne le conteneur
            const gallerySection = document.querySelector(".gallery");
            // on créé les éléments de la galerie
            const mediaZone = document.createElement("div");
            const pictureZone = document.createElement("picture");
            const imgZone = document.createElement("img");
            // on créé les classes et propriétés associées
            // on intègre les données récupérées
            imgZone.src = "./img/" + media.photographerId + "/" + media.image;
            // on attache les éléments au bon endroit
            gallerySection.append(mediaZone);
            mediaZone.append(pictureZone);
            pictureZone.append(imgZone);
        }
    }
}
export { Gallery };
//# sourceMappingURL=gallery.js.map