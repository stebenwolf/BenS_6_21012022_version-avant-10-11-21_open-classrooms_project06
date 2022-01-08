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

    createMedia() {
        if(document.querySelector(".gallery")) {

            // on sélectionne le conteneur
            const gallerySection = document.querySelector(".gallery");
            
            // on créé les éléments de la galerie
            const figureZone = document.createElement("figure");
            let mediaZone;
            const mediaInfos = document.createElement("figcaption");

            // on doit distinguer le cas où l'on a une video de celui où l'on a une image
            if (this.image.includes(".mp4")) {
                mediaZone = document.createElement("video");
                mediaZone.setAttribute("width","150px");
                mediaZone.setAttribute("height", "150px");
                mediaZone.setAttribute("preload", "none");
                mediaZone.setAttribute("poster","./img/"+this.photographerId+"/poster/"+this.image+".jpg");
                //poster="one-does-not-simply-placeholder.jpg"")
                const videoSourceZone = document.createElement("source");
                videoSourceZone.type = "video/mp4";
                videoSourceZone.src = "./img/"+this.photographerId+"/"+this.image;
                mediaZone.append(videoSourceZone);
            } else {
                mediaZone =  document.createElement("picture");
                const imgZone = document.createElement("img");
                imgZone.src = "./img/"+this.photographerId+"/"+this.image;
                imgZone.loading = "lazy";
                imgZone.alt = this.title;
                mediaZone.append(imgZone);
            }
            
            
            // on créé les classes et propriétés associées
            figureZone.className = "vignette";
            mediaZone.className = "media";
            figureZone.setAttribute("id",String(this.id));
                        
            // on intègre les données récupérées
            mediaInfos.innerHTML = "<span class=\"media-title\">"+this.title+"</span><span class=\"media-likes\" aria-label=\"likes\">"+this.likes+"</span>";
            
            // on attache les éléments au bon endroit
            gallerySection.append(figureZone);
            figureZone.append(mediaZone, mediaInfos);

            return figureZone;

        }

    }    
}

export {Media}