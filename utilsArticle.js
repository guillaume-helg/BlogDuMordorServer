const fs = require('fs');

// Fonction pour lire les données à partir d'un fichier
function readFileData(filePath) {
    let data = fs.readFileSync(filePath, 'utf-8');
    let jsonData = JSON.parse(data);
    return jsonData;
}

// Fonction pour ajouter un nouvel article à la base de donnée
function putArticle(filePath, dataObject) {
    let articles = readFileData(filePath);

    let maxId = Math.max(...articles.map(article => article.identifiant));

    dataObject.identifiant = maxId + 1;

    articles.push(dataObject);

    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

    console.log("Nouvel article ajouté !");
    return true;
}

// Fonction pour supprimer un article à la base de donnée
function removeArticle(filePath, idData) {
    let articles = readFileData(filePath);
    const idArticleASupprimer = parseInt(idData);
    const indexArticleASupprimer = articles.findIndex(article => article.identifiant === idArticleASupprimer);

    if (indexArticleASupprimer !== -1) {
        articles.splice(indexArticleASupprimer, 1);

        fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

        console.log("Article supprimé !");
        return true;
    } else {
        console.log("Aucun article avec l'identifiant " + idArticleASupprimer + " n'a été trouvé.");
        return false;
    }
}

// Fonction pour modifier un article de la base de donnée
function modifyArticle(filepath, dataObject) {
    let articles = readFileData(filepath);
    const idArticleAModifier = dataObject.identifiant;

    const articleAModifier = articles.find(article => article.identifiant === idArticleAModifier);

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

module.exports = {
    readFileData,
    putArticle,
    removeArticle,
    modifyArticle
};
