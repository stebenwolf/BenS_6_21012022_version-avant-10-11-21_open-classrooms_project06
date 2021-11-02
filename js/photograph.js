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
export { Photograph };
//# sourceMappingURL=photograph.js.map