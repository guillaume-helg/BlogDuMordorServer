const { readFileData} = require('../utilitaire.js');

const express = require('express');
const fs = require('fs');

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
    const nouvelArticle = req.body; // Supposons que req.body contient les détails du nouvel article à ajouter

    fs.readFile(pathToArticles, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }

        try {
            const articles = JSON.parse(data);
            articles.push(nouvelArticle); // Ajouter le nouvel article au tableau

            fs.writeFile(pathToArticles, JSON.stringify({ articles }), 'utf8', (err) => {
                if (err) {
                    console.error('Erreur d\'écriture du fichier JSON :', err);
                    return res.status(500).json({ error: 'Erreur interne du serveur' });
                }
                res.status(201).json({ message: 'Article ajouté avec succès' });
            });
        } catch (error) {
            console.error('Erreur lors de l\'analyse du fichier JSON :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
}

function deleteArticle(req, res) {
    const articleId = req.params.id; // Supposons que l'identifiant de l'article à supprimer soit passé en tant que paramètre d'URL

    fs.readFile(pathToArticles, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }

        try {
            let articles = JSON.parse(data);
            const index = articles.findIndex(article => article.id === articleId);

            if (index === -1) {
                return res.status(404).json({ error: 'Article non trouvé' });
            }

            articles.splice(index, 1); // Supprimer l'article du tableau

            fs.writeFile(pathToArticles, JSON.stringify({ articles }), 'utf8', (err) => {
                if (err) {
                    console.error('Erreur d\'écriture du fichier JSON :', err);
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

