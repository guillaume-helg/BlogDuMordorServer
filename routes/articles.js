const { readFileData } = require('../utilitaire.js');
const express = require('express');
const fs = require('fs');
const {putArticle, removeArticle, modifyArticle} = require("../utilitaire");
//const filePath =
const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getArticles);

// Route pour ajouter un nouvel article
router.post('/add', addArticle);

// Route pour supprimer un article
router.delete('/:id', deleteArticle);

module.exports = router;


function getArticles(req, res) {
    res.json(readFileData('./database/articles.json'));
}


function addArticle(req, res) {
    const nouvelArticle = {
        identifiant: 4,
        auteur: req.body.auteur,
        titre: req.body.titre,
        contenu: req.body.contenu,
        date_publication: req.body.date_publication
    };

    res.json(putArticle('./database/articles.json', nouvelArticle));
}


// Suppression de l'article
function deleteArticle(req, res) {
    res.json(removeArticle('./database/articles.json', req.body.identifiant));
}

function alterArticle(req, res) {
    const nouvelArticle = {
        identifiant: req.body.identifiant,
        auteur: req.body.auteur,
        titre: req.body.titre,
        contenu: req.body.contenu,
        date_publication: req.body.date_publication
    };
    res.json(modifyArticle('./database/articles.json', req.body.identifiant))
}


