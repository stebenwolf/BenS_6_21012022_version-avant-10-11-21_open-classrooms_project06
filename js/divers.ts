/* DIVERS */




function fetchSomePhotos(hashtag: string) {
    const resultList: Array<any> = [];
    fetch("../requirements/FishEyeData.json")
    .then(response => response.json())
    .then(data => {
        for (const q of data.photographers) {
            const request = q.tags.includes(hashtag);
            if(request) {
                resultList.push(q);
            }
        }
        //return displayPhotoInfos(resultList);
    })
    .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
}





// Quand on sélectionne un hashtag, cette fonction renvoie les profils associés.
/* function fetchSomePhotosHere(hashtag: string) {
    const resultList: Array<any> = [];
    fetch("../requirements/FishEyeData.json")
    .then(response => response.json())
    .then(data => {
        for (const q of data.photographers) {
            const request = q.tags.includes(hashtag);
            if(request) {
                resultList.push(q);
            }
        }
        return displayPhotoInfos(resultList);
    })
    .catch(error => console.error("Rohlalaaaa, la fauuuute! ", error));
}
fetchSomePhotos("events"); */


// On souhaite disposer d'une fonction qui va récupérer l'ensemble des hashtags existants
function getHashtags() {
    // On commence par récupérer la liste de tous les éléments de classe "hashtag"
    let allTags: NodeListOf<Element> = document.querySelectorAll(".hashtag");

    // On affiche le nombre de hashtags trouvés
    //console.log(allTags?.length + " hashtags found");

    // On veut les enregistrer dans une liste, pour cela on commence par créer ladite liste
    let taglist: any = [];

    // Comme il y a des hashtags qui se répètent, on veut les enregistrer dans la liste, mais une seule fois
    for (let i = 0; i<allTags?.length; i++) {

        // Parce qu'on s'intéresse uniquement au texte associé au hashtag, on prend chaque hashtag et on en tire le "textContent", qu'on convertit en minuscule
        let value = allTags[i].textContent.toLowerCase();

        // Est-ce que taglist intègre cette valeur ?
        if (!taglist.includes(value)) { // Si elle n'y est pas, on l'ajoute
            taglist.push(value);
        }
    }
    return console.log(taglist);
}


// Faire la liste des hashtags c'est pas tout, mais que veut-on faire avec ça?
// Déjà: quand on clique sur un hashtag on aimerait afficher uniquement les profils qui correspondent: c'est possible ça? Bah oui, mais faut le faire. DONC :
// Si je clique sur un hashtag, dans le menu en haut ou sur le profil d'un photographe, on récupère la valeur associée à ce hashtag
// Pour chaque profil de photographe, si le hashtag en question fait partie des hashtags de son profil, on display:block
// et sinon, on display:none
function getPhotographerHashtags() {
    console.log("prout");
    let photographerHastags: NodeListOf<Element> = document.querySelectorAll(".hashtag");
    for (let i = 0; i<photographerHastags.length; i++) {
        console.log(photographerHastags[i].parentNode.parentNode);
    }
    /* console.log(photographerHastags); */
}


// On veut attacher la propriété JS getPhotographerHashtags à tous les éléments concernés
function attachHashFunction() {
    let allTags: NodeListOf<Element> = document.querySelectorAll(".hashtag");
    let allProfiles = document.getElementsByTagName("article");
    console.log(allProfiles);
    //console.log(allTags?.length +  "hashtags found");
    for (let i=0; i<allTags?.length; i++) {
        //console.log(allTags);
        console.log("Le ID vaut: ",allTags[i]);
        allTags[i].setAttribute("onclick","getPhotographerHashtags();");
        allTags[i].addEventListener("click", function (event) {
            let eventTarget = event.target;
            //parentNode.parentNode.parentNode.attributes.id.value
            console.log("Event target", eventTarget);
        });
        //console.log(allTags[i].attributes);
    }
}