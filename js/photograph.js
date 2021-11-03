import { PhotographCard } from "./script.js";
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
    /* // On a des méthodes pour accéder à chaque propriété. Se pose la question de: sont-elles nécessaires si on connaît déjà les keys?
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getCity() {
        return this.city;
    }
    getCountry() {
        return this.country;
    }
    getTags() {
        return this.tags;
    }
    getTagline() {
        return this.tagline;
    }
    getPrice() {
        return this.price;
    }
    getPortrait() {
        return this.portrait;
    } */
    // cette méthode permet de générer de façon dynamique l'URL de la page de chaque photographe, sur le modèle : "photograph_XX_prenom_nom.html"
    getURL() {
        const url = 'photograph_' // préfixe d'URL photograph
            + this.id // on intègre l'ID pour éviter doublons
            + '_' // on sépare avec un _
            + this.name // on récupère ensuite le nom
                .toLowerCase() // on met le tout en minuscule
                .replace(' ', '_') // on va ensuite enlever les espaces et les remplacer par un _
            + '.html'; // enfin on ajoute l'extension .html
        return url;
    }
    // on souhaite maintenant pouvoir générer très facilement une carte photographe pour la page d'accueil, qui reprend donc les différents éléments et les agences comme il faut.
    generatePhotographCard() {
        return new PhotographCard(this.name, this.portrait, this.tagline, this.price);
    }
}
// On exporte le module
export { Photograph };
//# sourceMappingURL=photograph.js.map