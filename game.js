let allumettesRestantes = 50;
let joueur = 1;
let nombreMaxJoueur = 10; // Nombre de joueurs par défaut
let jeuEnCours = false;

// Mettre à jour l'affichage du nombre d'allumettes
function mettreAJourAffichage() {
    document.getElementById('message').innerText = `Il reste ${allumettesRestantes} allumettes.`;
}

// Mettre à jour l'affichage du tour actuel
function mettreAJourTour() {
    document.getElementById('tour-message').innerText = `C'est au tour du Joueur ${joueur}`;
}

// Fonction qui gère le tour du joueur
function jouerTour() {
    const nombre = parseInt(document.getElementById("nombre").value);

    // Vérifier si le nombre d'allumettes est valide
    if (isNaN(nombre) || nombre < 1 || nombre > 6 || nombre > allumettesRestantes) {
        alert("Veuillez entrer un nombre d'allumettes entre 1 et 6.");
        return;  // Si l'entrée n'est pas valide, stop
    }

    allumettesRestantes -= nombre;

    if (allumettesRestantes <= 0) {
        document.getElementById("message").innerText = `Le Joueur ${joueur} a gagné!`;
        document.getElementById("retirerAllumettes").disabled = true;  // Désactiver le bouton de jeu
        document.getElementById("rejouer-section").style.display = 'block';  // Afficher le bouton Rejouer
        return;
    }

    // Passer au joueur suivant
    if (joueur === nombreMaxJoueur) {
        joueur = 1; // Si on a atteint le nombre max de joueurs, revenir au premier joueur
    } else {
        joueur++;  // Sinon, passer au joueur suivant
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
    document.getElementById('game-controls').style.display = 'block';

    jeuEnCours = true;

    mettreAJourTour();
    mettreAJourAffichage();
}

function rejouer() {
    // Réinitialiser les variables
    allumettesRestantes = 50;
    joueur = 1;

    // Cacher le bouton "Rejouer" et réinitialiser l'affichage du jeu
    document.getElementById("rejouer-section").style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';

    // Réafficher l'écran de sélection du nombre de joueurs
    document.getElementById('choix-joueurs').style.display = 'block';

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
