const fs = require('fs');

// Fonction pour lire les données à partir d'un fichier
function readFileData(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function putArticle(filePath, dataObject) {
    let articles = readFileData(filePath);

    articles.articles.push(dataObject);

    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

    console.log("Nouvel article ajouté !");
    return true;
}

function removeArticle(filePath, idData) {
    let articles = readFileData(filePath);
    const idArticleASupprimer = idData;

    const indexArticleASupprimer = articles.articles.findIndex(article => article.identifiant === idArticleASupprimer);

    if (indexArticleASupprimer !== -1) {
        articles.articles.splice(indexArticleASupprimer, 1);

        fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));

        console.log("Article supprimé !");
        return true;
    } else {
        console.log("Aucun article avec l'identifiant " + idArticleASupprimer + " n'a été trouvé.");
        return false;
    }
}

function modifyArticle(filepath, dataObject) {
    let articles = readFileData(filepath);
    const idArticleAModifier = dataObject.identifiant;

    const articleAModifier = articles.articles.find(article => article.identifiant === idArticleAModifier);

    if (articleAModifier) {
        articleAModifier.titre = dataObject.titre;
        articleAModifier.auteur = dataObject.auteur;
        articleAModifier.contenu = dataObject.contenu;
        articleAModifier.date_publication = dataObject.date_publication;

        fs.writeFileSync(filepath, JSON.stringify(articles, null, 2));

        console.log("Article modifié !");
        return true;
    } else {
        console.log("Aucun article avec l'identifiant " + idArticleAModifier + " n'a été trouvé.");
        return false;
    }
}


// Fonction pour lire les données utilisateur
function readUserData(email, password, res) {
    fs.readFile('utilisateurs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
        try {
            const utilisateurs = JSON.parse(data);
            const user = utilisateurs.find(profile => profile.email === email && profile.mot_de_passe === password);
            if (user) {
                res.status(200).json({ message: 'Authentification réussie', user });
            } else {
                res.status(401).json({ error: 'Adresse email ou mot de passe incorrect.' });
            }
        } catch (error) {
            console.error('Erreur lors de l\'analyse du fichier JSON :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
}

module.exports = {
    readFileData,
    readUserData,
    putArticle,
    removeArticle,
    modifyArticle
};
