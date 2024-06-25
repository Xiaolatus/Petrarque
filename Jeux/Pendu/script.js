// Récupérer les mots de la BD des mots

var motObj = null;

window.addEventListener("load", (event) => {
    fetch('./mots.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de récupération de la liste de mots pour le Pendu.');
            }
            return response.json();
        })
        .then(data => {
            motObj = data.mots;
            lancerJeu();
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
});

// Donne un nombre aléatoire entre "min" et "max"
function nombreAléatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction permettant d'utiliser .replaceAt pour remplacer une lettre d'un mot grâce à son index 
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function remplacerAccent(caractere) {
    // Normaliser le caractère Unicode pour supprimer les accents
    var caractereNormalise = caractere.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Utiliser une expression régulière pour supprimer les caractères non alphanumériques
    var caractereSansAccent = caractereNormalise.replace(/[^a-zA-Z0-9]/g, "");
    return caractereSansAccent;
}

// Démarrer le Pendu
var motChoisi = null;
var motAfficher = null;
var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
var fautes = 0;
var partieTerminer = false;

function lancerJeu() {
    // Permet de créer le clavier avec les différentes lettres.
    var clavier = document.getElementById("lettresPendu");
    alphabet.forEach(function(lettre) {
        var boutonLettre = document.createElement("p");
        boutonLettre.textContent = lettre.toUpperCase();
        boutonLettre.id = "penduLettre"+lettre;
        boutonLettre.setAttribute("onclick", "cliqueSurLettre('" + lettre + "')");
        clavier.appendChild(boutonLettre);
    })

    motChoisi = motObj[nombreAléatoire(0, motObj.length -1)];
    console.log(motChoisi);

    motAfficher = "";
    motAfficher += motChoisi.charAt(0).toUpperCase();

    for (var i = 1; i < motChoisi.length; i++) {
        motAfficher += "_";
    }

    var indices = trouverTousLesIndices(motChoisi, motChoisi.charAt(0));
    for (var i = 1; i < indices.length; i++) {
        motAfficher = setCharAt(motAfficher, indices[i], motChoisi.charAt(indices[i])).toUpperCase();
    };
    
    var mot = document.createElement("p");
    mot.textContent = motAfficher;
    document.getElementById("motPendu").appendChild(mot);
    document.getElementById("penduLettre"+remplacerAccent(motAfficher.charAt(0).toLowerCase())).style.backgroundColor = "rgba(100, 100, 100, 0.5)";
    document.getElementById("penduLettre"+remplacerAccent(motAfficher.charAt(0).toLowerCase())).removeAttribute("onclick");
}

function normaliser(chaine) {
    return chaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fonction pour trouver tous les indices d'une lettre dans un mot
function trouverTousLesIndices(mot, lettre) {
    var indices = [];
    var lettreNormalisee = normaliser(lettre.toLowerCase());
    var motNormalise = normaliser(mot.toLowerCase());

    for (var i = 0; i < motNormalise.length; i++) {
        if (motNormalise[i] === lettreNormalisee) {
            indices.push(i);
        }
    }
    return indices;
}

// Fonction appeler lorsque l'on clique sur l'une des lettres du clavier
function cliqueSurLettre(lettre) {
    if (partieTerminer) return;

    document.getElementById("penduLettre"+lettre.toLowerCase()).style.backgroundColor = "rgba(100, 100, 100, 0.5)";
    document.getElementById("penduLettre"+lettre.toLowerCase()).removeAttribute("onclick");

    var indices = trouverTousLesIndices(motChoisi, lettre);
    if (indices.length > 0) {
        for (var i = 0; i < indices.length; i++) {
            motAfficher = setCharAt(motAfficher, indices[i], motChoisi.charAt(indices[i])).toUpperCase();
        };
        document.getElementById("motPendu").children[0].textContent = motAfficher;
        
        indices = trouverTousLesIndices(motAfficher, "_");
        if (indices.length == 0) {
            partieTerminer = true;
            alert("Bien joué!");
        }
    } else {
        fautes++;
        document.getElementById("dessinPendu").children[0].setAttribute("src", "./img/pendu"+fautes+".png");
        
        if (fautes >= 11) {
            partieTerminer = true;
            alert("Dommage, essaye encore.");
        }
    }
}