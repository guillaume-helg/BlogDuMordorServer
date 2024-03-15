const { readUserData, createUser, modifyUser, deleteUser, connectUser} = require('../utilsUtilisateur');
const express = require('express');
const filePath = './database/utilisateurs.json'

const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getUtilisateur);

router.get('/login', loginUser);

// Route pour ajouter un nouvel article
router.post('/add', addUtilisateur);

// Route pour modifier un article
router.post('/modify', alterUtilisateur)

// Route pour supprimer un article
router.delete('/remove', deleteUtilisateur);

module.exports = router;

function getUtilisateur(req, res) {
    res.json(readUserData(filePath));
}

function addUtilisateur(req, res) {
    const nouvelUtilisateur = {
        identifiant: 4,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        numeroTelephone: req.body.numeroTelephone,
        id_blog_utilisateur: req.body.id_blog_utilisateur

    };

    res.json(createUser(filePath, nouvelUtilisateur));
}

function alterUtilisateur(req, res) {
    const modifUtilisateur = {
        identifiant: 4,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        numeroTelephone: req.body.numeroTelephone,
        id_blog_utilisateur: req.body.id_blog_utilisateur

    };

    res.json(modifyUser(filePath, modifUtilisateur));
}

function deleteUtilisateur(req, res) {
    res.json(deleteUser(filePath, req.body.identifiant));
}
// Fonction pour connecter un utilisateur
function loginUser(req, res) {
    console.log("yay");
    res.json(connectUser(filePath, req.body.email, req.body.motDePasse));

}