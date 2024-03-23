const { readUserData, createUser, modifyUser, deleteUser, connectUser} = require('../utilsUtilisateur');
const express = require('express');
const filePath = './database/utilisateurs.json'
const { createBlog } = require('../utilsBlog');

const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getUtilisateur);

router.post('/login', loginUser);

// Route pour ajouter un nouvel article
router.post('/add', addUtilisateur);

// Route pour modifier un article
router.post('/modify', alterUtilisateur)

// Route pour supprimer un article
router.delete('/remove/:id', deleteUtilisateur);

module.exports = router;

// Récupère tout les utilisateurs
function getUtilisateur(req, res) {
    res.json(readUserData(filePath));
}

// Ajoute un utilisateur
function addUtilisateur(req, res) {
    const nouvelUtilisateur = {
        identifiant: 4,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        numeroTelephone: req.body.numeroTelephone,
        idBlog: 0
    };

    res.json(createUser(filePath, nouvelUtilisateur));
}

// Modifie un utilisateur
function alterUtilisateur(req, res) {
    const modifUtilisateur = {
        identifiant: req.body.identifiant,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        motDePasse: req.body.motDePasse,
        numeroTelephone: req.body.numeroTelephone,
        id_blog_utilisateur: req.body.idBlog
    };

    res.json(modifyUser(filePath, modifUtilisateur));
}

// Fonction pour supprimer un utilisateur avec son id
function deleteUtilisateur(req, res) {
    res.json(deleteUser(filePath, req.params.id));
}

// Fonction pour connecter un utilisateur
function loginUser(req, res) {
    res.json(connectUser(filePath, req.body.email, req.body.password));
}