let allumettesRestantes = 50;
let joueur = 1;
let nombreMaxJoueur = 10; // Nombre de joueurs par défaut
let jeuEnCours = false;
let joueurs = [
    { id: "joueur 1", bouleId: "boulle_ken", nom: "" },
    { id: "joueur 2", bouleId: "boulle_ryu", nom: "" },
    { id: "joueur 3", bouleId: "boulle_ken", nom: "" },
    { id: "joueur 4", bouleId: "boulle_ryu", nom: "" },
    { id: "joueur 5", bouleId: "boulle_ken", nom: "" },
    { id: "joueur 6", bouleId: "boulle_ryu", nom: "" },
    { id: "joueur 7", bouleId: "boulle_ken", nom: "" },
    { id: "joueur 8", bouleId: "boulle_ryu", nom: "" },
    { id: "joueur 9", bouleId: "boulle_ken", nom: "" },
    { id: "joueur 10", bouleId: "boulle_ryu", nom: "" }
];

// Mettre à jour l'affichage du nombre d'allumettes et des animations
function mettreAJourAffichage() {
    // Mise à jour du nombre d'allumettes restantes
    document.getElementById('message').innerText = `Il reste ${allumettesRestantes} allumettes.`;

    // Réinitialiser les animations avant de les appliquer
    joueurs.forEach((joueur) => {
        let boule = document.getElementById(joueur.bouleId);
        if (boule) {
            boule.classList.remove('boulle-deplacement');
            boule.style.display = 'none'; // Cacher la boule avant l'animation
        }
    });

    // Appliquer l'animation en fonction du joueur actif
    let joueurActif = joueurs[joueur - 1];
    let bouleActuelle = document.getElementById(joueurActif.bouleId);
    if (bouleActuelle) {
        bouleActuelle.style.display = 'block';  // Afficher la boule du joueur actif
        bouleActuelle.classList.add('boulle-deplacement');
    }

    // Ajouter l'image "feu_allumette" qui apparait/disparait en même temps
    let feuAllumette = document.getElementById("feu_allumette");
    if (feuAllumette) {
        // Vérifier quel personnage est actif et ajuster la position en conséquence
        if (bouleActuelle.id === 'boulle_ken') {
            // Si Ken est actif, positionner l'image à gauche
            feuAllumette.style.left = '50%';  // Position à gauche
        } else if (bouleActuelle.id === 'boulle_ryu') {
            // Si Ryu est actif, positionner l'image à droite
            feuAllumette.style.left = '70%';  // Position à droite
        }

        feuAllumette.style.display = 'block';  // Afficher l'image feu_allumette
        feuAllumette.classList.add('boulle-deplacement');  // Ajouter l'animation de déplacement
    }

    // Attendre la fin de l'animation et ensuite cacher les boules et le feu
    setTimeout(function () {
        if (bouleActuelle) {
            bouleActuelle.style.display = 'none';  // Cacher la boule après l'animation
        }
        if (feuAllumette) {
            feuAllumette.style.display = 'none';  // Cacher le feu_allumette après l'animation
        }
    }, 2000);  // Ajustez cette valeur en fonction de la durée de votre animation
}


    // Attendre la fin de l'animation et ensuite cacher les boules
    setTimeout(function () {
        if (bouleActuelle) {
            bouleActuelle.style.display = 'none';  // Cacher la boule après l'animation
        }
    }, 2000);  // Ajustez cette valeur en fonction de la durée de votre animation


// Mettre à jour l'affichage du tour actuel
function mettreAJourTour() {
    document.getElementById('tour-message').innerText = `C'est au tour du Joueur ${joueur} ${joueurs[joueur - 1].nom}`;
}

// Fonction qui gère le tour du joueur
function jouerTour() {
    const nombre = parseInt(document.getElementById("nombre").value);

    // Vérifier si le nombre d'allumettes est valide
    if (isNaN(nombre) || nombre < 1 || nombre > 6 || nombre > allumettesRestantes) {
        alert("Regarde bien combien il reste d'allumettes !");
        return;  // Si l'entrée n'est pas valide, stop
    }

    allumettesRestantes -= nombre;

    if (allumettesRestantes <= 0) {
        document.getElementById("message").innerText = `Le Joueur ${joueur} a gagné!`;
        document.getElementById("retirerAllumettes").disabled = true;  // Désactiver le bouton de jeu
        
        document.getElementById("rejouer-section").style.display = 'block';  // Afficher le bouton Rejouer
        
        // Afficher l'image de fin de jeu après la dernière allumette
        document.getElementById("image_fin_jeu").style.display = 'block';
        
        return;
    }

    // Passer au joueur suivant
    if (joueur > nombreMaxJoueur) {
        joueur = 1; // Si on a atteint le nombre max de joueurs, revenir au premier joueur
    }else{
        joueur++;
    }

    mettreAJourAffichage();
    mettreAJourTour();
}

// Fonction pour démarrer le jeu après le choix du nombre de joueurs
function demarrerJeu() {
    nombreMaxJoueur = parseInt(document.getElementById('nombre-joueurs').value);

    // Vérifier que le nombre de joueurs est valide
    if (nombreMaxJoueur < 2 || nombreMaxJoueur > 10) {
        alert("Veuillez choisir entre 2 et 10 joueurs.");
        return;
    }

    // Cacher l'écran de sélection des joueurs et afficher le jeu
    document.getElementById('choix-joueurs').style.display = 'none';
    document.getElementById('text_number_player').style.display = 'none'; // Cache la section
    document.getElementById('game-controls').style.display = 'block';

    jeuEnCours = true;

    mettreAJourTour();
    mettreAJourAffichage();
}

function rejouer() {
    // Réinitialiser les variables
    allumettesRestantes = 50;
    joueur = 1;

    // Cacher l'image de fin de jeu lors de la reprise
    document.getElementById("image_fin_jeu").style.display = 'none';  // Masquer l'image de fin de jeu
    // Cacher le bouton "Rejouer" et réinitialiser l'affichage du jeu
    document.getElementById("rejouer-section").style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';

    // Réafficher l'écran de sélection du nombre de joueurs
    document.getElementById('choix-joueurs').style.display = 'block';
    document.getElementById('text_number_player').style.display = 'block'; // Afficher le texte de sélection du nombre de joueurs

    // Réinitialiser les messages
    document.getElementById('message').innerText = "Il reste 50 allumettes.";
    document.getElementById('tour-message').innerText = "C'est au tour du Joueur 1";

    // Réinitialiser le bouton "Retirer des allumettes"
    document.getElementById("retirerAllumettes").disabled = false;
}

// Ajouter un événement pour le bouton de démarrage du jeu
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("commencer").addEventListener("click", demarrerJeu);
    document.getElementById("retirerAllumettes").addEventListener("click", jouerTour);

    // Ajouter l'événement pour le bouton "Rejouer"
    document.getElementById("rejouer").addEventListener("click", rejouer);
});