const fs = require('fs');

function readUserData(filePath) {
    let data = fs.readFileSync(filePath, 'utf-8');
    let jsonData = JSON.parse(data);
    return jsonData;
}

function createUser(filePath, dataObject) {
    let utilisateurs = readUserData(filePath);

    let maxId = Math.max(...utilisateurs.map(article => article.identifiant));

    dataObject.identifiant = maxId + 1;

    utilisateurs.push(dataObject);

    fs.writeFileSync(filePath, JSON.stringify(utilisateurs, null, 2));

    console.log("Nouvel utilisateur ajouté !");
    return true;
}

function modifyUser(filepath, dataObject) {
    let utilisateurs = readUserData(filepath);
    const idUtilisateurAModifier = dataObject.identifiant;

    const utilisateurAModifier = utilisateurs.find(utilisateur => utilisateur.identifiant === idUtilisateurAModifier);

    if (utilisateurAModifier) {
        utilisateurAModifier.titre = dataObject.titre;
        utilisateurAModifier.auteur = dataObject.auteur;
        utilisateurAModifier.contenu = dataObject.contenu;
        utilisateurAModifier.date_publication = dataObject.date_publication;

        fs.writeFileSync(filepath, JSON.stringify(utilisateurs, null, 2));

        console.log("Article modifié !");
        return true;
    } else {
        console.log("Aucun article avec l'identifiant " + idUtilisateurAModifier + " n'a été trouvé.");
        return false;
    }
}

function deleteUser(filePath, idData) {
    let utilisateurs = readUserData(filePath);
    const idUtilisateurASupprimer = idData;
    console.log(utilisateurs);
    const indexUtilisateurASupprimer = utilisateurs.findIndex(utilisateur => utilisateur.identifiant === idUtilisateurASupprimer);

    if (indexUtilisateurASupprimer !== -1) {
        utilisateurs.splice(indexUtilisateurASupprimer, 1);

        fs.writeFileSync(filePath, JSON.stringify(utilisateurs, null, 2));

        console.log("Utilisateur supprimé !");
        return true;
    } else {
        console.log("Aucun utilisateur avec l'identifiant " + idUtilisateurASupprimer + " n'a été trouvé.");
        return false;
    }
}

function connectUser(filePath, mail, password) {
    const utilisateurs = readUserData(filePath);
    const utilisateur = utilisateurs.find(utilisateur => utilisateur.email === mail);

    if (!utilisateur) {
        throw new Error(`Utilisateur "${mail}" non trouvé.`);
    }

    console.log(password);
    console.log(mail);

    return utilisateur.motDePasse === password;
}

module.exports = {
    readUserData,
    createUser,
    modifyUser,
    deleteUser,
    connectUser,
};