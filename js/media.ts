interface Media {
    id: number,
    photographerId: number,
    title: string,
    image: string,
    tags: Array<string>,
    likes: number,
    date: Date,
    price: number
}


class Media {
    constructor(id: number, photographerId: number, title: string, image: string, tags: Array<string>, likes:number, date: Date, price: number) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.image = image;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    } 
}

export {Media}