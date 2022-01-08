import {Media} from "./media.js";

// L'objet Modal gère l'affichage ... des modales ! (eh oui.) On recense deux types de modales : 
// - la modale "contact", affichée en haut de la page de profil photographe : elle affiche un formulaire de contact pour envoyer un message au photographe
// - la modale "media", qui va elle afficher en gros plan le média sélectionné. Cette modale comprend par ailleurs des boutons "précédent" et "suivant"

// L'objet "modal" prend en entrée... un type de modal (contact ou media)
// les sous-objets modal prennent en entrée :
// modale contact: prend en entrée un id photographe
// modale media: prend en entrée un ID media (+ photographe?)

interface Modal {
    photographId: number;
    //mediaId: number;
}

class Modal {
    constructor(photographId: number) {
        this.photographId = photographId;
        //this.mediaId = mediaId;
    }

    createContactModal(name: string) {

        //on créé d'abord l'ensemble des éléments dont on a besoin
        let contactModalSection = document.createElement("section");
        contactModalSection.id = "form-modal";
        contactModalSection.className = "form-modal shadow";

        const contactModalHeader = document.createElement("header");
        contactModalHeader.className = "contact-modal--title";
        contactModalHeader.innerHTML = "<h1>Contactez-moi<br>"+name+"</h1>";
        contactModalHeader.id = "Contactez-moi "+name;

        const modalClose = document.createElement("span");
        modalClose.className = "contact-modal--close";

        const contactModalForm = document.createElement("form");
        contactModalForm.id = "contact-modal";
        contactModalForm.target = "_self";

        const contactModalLabelFirst = document.createElement("label");
        contactModalLabelFirst.setAttribute("for", "firstname");
        contactModalLabelFirst.id = "Prénom";
        contactModalLabelFirst.innerHTML = "Prénom<br>";
        
        const contactModalInputFirst = document.createElement("input");
        contactModalInputFirst.type = "text";
        contactModalInputFirst.setAttribute("aria-labelledby","Prénom");
        
        const contactModalLabelLast = document.createElement("label");
        contactModalLabelLast.setAttribute("for", "lastname");
        contactModalLabelLast.id = "Nom";
        contactModalLabelLast.innerHTML = "Nom<br>";

        const contactModalInputLast = document.createElement("input");
        contactModalInputLast.type = "text";
        contactModalInputLast.setAttribute("aria-labelledby","Nom");

        const contactModalLabelEmail = document.createElement("label");
        contactModalLabelEmail.setAttribute("for", "email");
        contactModalLabelEmail.id = "Email";
        contactModalLabelEmail.innerHTML = "Email<br>";

        const contactModalInputEmail = document.createElement("input");
        contactModalInputEmail.type = "email";
        contactModalInputEmail.setAttribute("aria-labelledby","Email");

        const contactModalLabelMessage = document.createElement("label");
        contactModalLabelMessage.setAttribute("for", "message");
        contactModalLabelMessage.id = "Votre message";
        contactModalLabelMessage.innerHTML = "Votre message<br>";

        const contactModalTextareaMessage = document.createElement("textarea");
        contactModalTextareaMessage.setAttribute("aria-labelledby","Votre message");

        const contactModalButton = document.createElement("button");
        contactModalButton.setAttribute("aria-label","Envoyer");
        contactModalButton.className = "btn-contact btn-contact-send";
        contactModalButton.type = "submit";
        contactModalButton.textContent = "Envoyer";

        // on va ensuite les assembler

        contactModalForm.append(
            contactModalLabelFirst,
            contactModalInputFirst,
            contactModalLabelLast,
            contactModalInputLast,
            contactModalLabelEmail,
            contactModalInputEmail,
            contactModalLabelMessage,
            contactModalTextareaMessage,
            contactModalButton
        )

        contactModalSection.append(
            contactModalHeader,
            modalClose,
            contactModalForm
        );

        modalClose.addEventListener("click", () => {

            contactModalSection.remove();
            const body = document.querySelector("body");
            body.removeAttribute("class");
        })
        contactModalButton.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Prénom: ",contactModalInputFirst.value);
            console.log("Nom : ",contactModalInputLast.value);
            console.log("Email : ",contactModalInputEmail.value);
            console.log("Message : ",contactModalTextareaMessage.value);
            contactModalSection.remove();
            const body = document.querySelector("body");
            body.removeAttribute("class");
        })

        return contactModalSection;
    }


    createMediaModal(list: Array<Media>, i:number) {
        //on commence par créer l'ensemble des éléments dont on a besoin, à savoir :
        // une grande div à fond blanc
        // une zone image
        // une zone bouton avant
        // une zone bouton après
        // une légende
        // un bouton close
        
        const mediaModalSection = document.createElement("section");
        mediaModalSection.className = "lightbox-modal";
        mediaModalSection.setAttribute("aria-label","image closeup view");

        const media = list[i];
        
        const mediaModalFigure = document.createElement("figure");
        mediaModalFigure.className = "media-modal--figure";

        let mediaModalZone;

        const modalClose = document.createElement("span");
        modalClose.className = "mediaControl closeMedia";

        if (media.image.includes(".mp4")) {
            mediaModalZone = document.createElement("video");
            mediaModalZone.className = "mediaModalZone--video shadow";
            mediaModalZone.setAttribute("controls", "true");
            
            const mediaModalVideoSource = document.createElement("source");
            mediaModalVideoSource.type = "video/mp4";
            mediaModalVideoSource.src = "./img/"+media.photographerId+"/"+media.image;
            mediaModalZone.append(mediaModalVideoSource);
        } else {
            mediaModalZone = document.createElement("picture");
            mediaModalZone.className = "mediaModaleZone--image";
            const mediaModalZoneImg = document.createElement("img");
            mediaModalZoneImg.className = "shadow";
            mediaModalZoneImg.src = "./img/"+media.photographerId+"/"+media.image;
            mediaModalZone.append(mediaModalZoneImg);
        }
        
        mediaModalZone.id = "mediaModalZone";

        const mediaModalFigcaption = document.createElement("figcaption");
        mediaModalFigcaption.className = "media-modal--figcaption";
        mediaModalFigcaption.textContent = media.title;

        mediaModalFigure.append(mediaModalZone, mediaModalFigcaption);

        mediaModalSection.append(mediaModalFigure, modalClose);

        // le média précédent correspond à l'élément précédent de la liste
        const previousMedia = list[i-1];
        // le média suivant corresponda à l'élément suivant de la liste
        const nextMedia = list[i+1];
        const body = document.querySelector("body");
        
        // si previousMedia existe, on affiche une flèche à gauche
        if(previousMedia) { 
            let previousMediaLink = document.createElement("p");
            previousMediaLink.innerHTML = "<";
            previousMediaLink.className = "mediaControl previousMedia";
            // on ajoute un event listener: au clic, on supprime la modale actuelle et on la remplace par la modale précédente
            previousMediaLink.addEventListener("click", () => 
            {
                
                mediaModalSection.remove();
                body.append(this.createMediaModal(list, i-1));
            });
            
            mediaModalSection.append(previousMediaLink);
        }
        //si nextMedia existe, on affiche une flèche à droite
        if (nextMedia) {
            let nextMediaLink = document.createElement("p");
            nextMediaLink.innerHTML = ">";
            nextMediaLink.className = "mediaControl nextMedia";
            // on ajoute un event listener: au clic, on supprime la première modale et on la remplace par la modale suivante
            nextMediaLink.addEventListener("click", () => 
            {
                mediaModalSection.remove();
                body.append(this.createMediaModal(list, i+1));
            });
            mediaModalSection.append(nextMediaLink);
        }

        // on créé un event listener qui gère la fermeture de la modale lorsqu'on clique sur la croix
        modalClose.addEventListener("click", () => {
            mediaModalSection.remove();
            body.removeAttribute("class");
        })

        return mediaModalSection;

    }


}

export {Modal}