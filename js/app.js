import { GalleryOfPhotographs, GalleryOfMedias } from "./gallery.js";
/* La classe APP génère le contenu de la page demandée :
- si on est sur la page index.html, elle génère le bandeau supérieur, la zone avec les hashtags, et la galerie des profils de photographes;
- si on est sur la page photograph.html, elle va générer le bandeau supérieur, le cadre photographe et la galerie de médias.

Pas de constructeur, uniquement une méthode "getContent" : si on a une balise d'ID index, on envoie la page d'accueil, sinon, on envoie la page photographe
*/
class App {
    // Cette méthode vérifie sur quelle page on se trouve. Si on est à l'accueil, on envoie le contenu de l'index.html, et si on est sur la page photographe, on envoie le contenu de la page photographe.
    getContent() {
        const index = document.getElementById("index");
        const profile = document.getElementById("profile");
        if (index) {
            this.buildIndexHTML();
        }
        else if (profile) {
            this.buildPhotographHTML();
        }
        else {
            return false;
        }
    }
    //Cette méthode va générer le contenu spécifique à la page index.html, à savoir... lancer une galerie de photographes. Utile alors? Pas si on avait juste la page index, mais avec la page photographe ça peut...
    buildIndexHTML() {
        const galleryOfPhotographs = new GalleryOfPhotographs;
        return galleryOfPhotographs.displayGallery(galleryOfPhotographs);
    }
    // Cette méthode va générer le contenu spécifique à la page photograph.html, à savoir:
    // - un cadre "infos photographe"
    // - et une galerie médias.
    buildPhotographHTML() {
        // On créé la zone "infos photographe"
        const photographerInfos = new GalleryOfPhotographs;
        photographerInfos.displayInfos(photographerInfos);
        // et la zone "galerie de médias"
        const galleryOfMedias = new GalleryOfMedias;
        galleryOfMedias.displayGallery(galleryOfMedias);
        return true;
    }
}
export { App };
//# sourceMappingURL=app.js.map