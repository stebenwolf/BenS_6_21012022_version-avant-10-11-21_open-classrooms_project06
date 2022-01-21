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

    // cette méthode va créer un media, c'est-à-dire un bloc affiché sur la page photographe, constitué d'une figure (image ou vidéo) et d'une légende -la légende contenant le titre de la photo et le nombre de likes de la photo.
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

                const videoSourceZone = document.createElement("source");
                videoSourceZone.type = "video/mp4";
                videoSourceZone.src = "./img/"+this.photographerId+"/"+this.image;
                
                mediaZone.append(videoSourceZone);
                mediaZone.setAttribute("alt",this.title);
                mediaZone.className = "media shadow";
            } else {
                mediaZone =  document.createElement("picture");
                const imgZone = document.createElement("img");
                
                // optimisation lazyload
                imgZone.setAttribute("data-sizes","auto");
                imgZone.setAttribute("data-src","./img/"+this.photographerId+"/"+this.image);
                imgZone.className = "lazyload shadow";

                imgZone.alt = "Photo ayant pour titre : "+this.title;
                mediaZone.className = "media";
                mediaZone.append(imgZone);
            }
            
            // on créé les classes et propriétés associées
            figureZone.className = "vignette";
            
            figureZone.setAttribute("id",String(this.id));
                        
            // on intègre les données récupérées  
            mediaInfos.insertAdjacentHTML("afterbegin","<span class=\"media-title\">"+this.title+"</span>");
            mediaInfos.insertAdjacentHTML("beforeend", "<span class=\"media-likes\" aria-label=\"likes\">"+this.likes+"</span>");
            
            // on attache les éléments au bon endroit
            gallerySection.append(figureZone);
            figureZone.append(mediaZone, mediaInfos);

            return figureZone;
        }
    }    
}

export {Media}