// Création d'un objet "Photographe"
/*Fichier JSON : "photographers": [
        {
          "name": "Mimi Keel",
          "id": 243,
          "city": "London",
          "country": "UK",
          "tags": ["portrait", "events", "travel", "animals"],
          "tagline": "Voir le beau dans le quotidien",
          "price": 400,
          "portrait": "MimiKeel.jpg"
        }
*/
/* Notre objet photographe doit :
* contenir l'ensemble des informations du fichier JSON
* permettre d'accéder à chacune des propriétés individuellement
*/

interface Photograph { // requis pour TS
    id: number;
    name: string;
    city: string;
    country: string;
    tags: Array<string>;
    tagline: string;
    price: number;
    portrait: string;
    [key: string]: any;
}

class Photograph {
    constructor(id: number, name: string, city: string, country: string, tags: Array<string>, tagline: string, price: number, portrait: string) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }

    // On a des méthodes pour accéder à chaque propriété. Se pose la question de: sont-elles nécessaires si on connaît déjà les keys?
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
    }
}

// On exporte le module
export {Photograph}; 