const express = require('express');
const { putArticle, removeArticle, modifyArticle, readFileData } = require("../utilsArticle");
const filePath = './database/articles.json'
const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getArticles);

// Route pour ajouter un nouvel article
router.post('/add', addArticle);

// Route pour modifier un article
router.post('/modify', alterArticle)

// Route pour supprimer un article
router.delete('/remove/:id', deleteArticle);

module.exports = router;

function getArticles(req, res) {
    res.json(readFileData(filePath));
}

// A
function addArticle(req, res) {
    const nouvelArticle = {
        identifiant: 4,
        auteur: req.body.auteur,
        titre: req.body.titre,
        contenu: req.body.contenu,
        date_publication: req.body.date_publication
    };

    res.json(putArticle(filePath, nouvelArticle));
}

// Suppression de l'article
function deleteArticle(req, res) {
    res.json(removeArticle(filePath, req.params.id));
}

// Modification de l'article
function alterArticle(req, res) {
    const modifArticle = {
        identifiant: req.body.identifiant,
        auteur: req.body.auteur,
        titre: req.body.titre,
        contenu: req.body.contenu,
        date_publication: req.body.date_publication
    };
    res.json(modifyArticle(filePath, modifArticle))
}