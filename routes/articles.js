const { readFileData} = require('../utilitaire.js');
const express = require('express');
const fs = require('fs');
const file = require("../database/articles.json")
const pathToArticles = "../database/articles.json";

const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getArticles);

// Route pour ajouter un nouvel article
router.post('/add', addArticle);

// Route pour supprimer un article
router.delete('/:id', deleteArticle);

module.exports = router;


function getArticles(req, res) {
    readFileData('./database/articles.json', res);
}

function addArticle(req, res) {
    try {
        const file = './database/articles.json';
        let content = [];

        readFileData(file, res);

        content = res;

        const nouvelArticle = {
            identifiant: req.body.identifiant,
            titre: req.body.titre,
            contenu: req.body.contenu,
            auteur: req.body.auteur,
            datePublication: req.body.datePublication
        };

        content.push(nouvelArticle);

        fs.writeFileSync(file, JSON.stringify(content, null, 2));
        console.log('Article ajouté avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'écriture du fichier :', error);
    }
}


// Fonction pour la lecture du fichier JSON
function lireFichierJSON(chemin, callback) {
    fs.readFile(chemin, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

// Fonction pour la recherche de l'article à supprimer
function trouverIndexArticle(articles, articleId) {
    return articles.findIndex(article => article.id === articleId);
}

function ajouterArticle(articles, article) {
    articles.push(article)
}

// Fonction pour supprimer l'article du tableau
function supprimerArticle(articles, index) {
    articles.splice(index, 1);
}

// Fonction pour l'écriture du fichier JSON
function ecrireFichierJSON(chemin, articles, callback) {
    fs.writeFile(chemin, JSON.stringify({ articles }), 'utf8', (err) => {
        if (err) {
            console.error('Erreur d\'écriture du fichier JSON :', err);
            callback(err);
        } else {
            callback(null);
        }
    });
}

// Suppression de l'article
function deleteArticle(req, res) {
    const articleId = req.params.id;

    lireFichierJSON(pathToArticles, (err, data) => {

        try {
            let articles = JSON.parse(data);
            const index = trouverIndexArticle(articles, articleId);

            if (index === -1) {
                return res.status(404).json({ error: 'Article non trouvé' });
            }

            supprimerArticle(articles, index);

            ecrireFichierJSON(pathToArticles, articles, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur interne du serveur' });
                }
                res.status(200).json({ message: 'Article supprimé avec succès' });
            });
        } catch (error) {
            console.error('Erreur lors de l\'analyse du fichier JSON :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
}


