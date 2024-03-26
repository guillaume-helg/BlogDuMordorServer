const fs = require('fs');
const {createBlog, deleteBlog} = require("./utilsBlog");

// Fonction pour lire les données utilisateur
function readUserData(filePath) {
    let data = fs.readFileSync(filePath, 'utf-8');
    let jsonData = JSON.parse(data);
    return jsonData;
}

// Fonction pour creer un utilisateur et le blog associé
function createUser(filePath, dataObject) {
    let utilisateurs = readUserData(filePath);

    let maxId = Math.max(...utilisateurs.map(article => article.identifiant));

    dataObject.identifiant = maxId + 1;
    dataObject.idBlog = maxId + 1;

    createBlog('./database/blogs.json', dataObject);

    utilisateurs.push(dataObject);

    fs.writeFileSync(filePath, JSON.stringify(utilisateurs, null, 2));

    console.log("Nouvel utilisateur ajouté !");
    return true;
}

// Fonction pour modifier des paramètres d'un utilisateur
function modifyUser(filepath, dataObject) {
    let utilisateurs = readUserData(filepath);
    const idUtilisateurAModifier = dataObject.identifiant;

    const utilisateurAModifier = utilisateurs.find(utilisateur => utilisateur.identifiant === idUtilisateurAModifier);

    if (utilisateurAModifier) {
        utilisateurAModifier.nom = dataObject.nom;
        utilisateurAModifier.prenom = dataObject.prenom;
        utilisateurAModifier.email = dataObject.email;
        utilisateurAModifier.motDePasse = dataObject.motDePasse;
        utilisateurAModifier.numeroTelephone = dataObject.numeroTelephone;

        fs.writeFileSync(filepath, JSON.stringify(utilisateurs, null, 2));

        console.log("Compte modifié !");
        return true;
    } else {
        console.log("Compte article avec l'identifiant " + idUtilisateurAModifier + " n'a été trouvé.");
        return false;
    }
}

// Fonctions utilisée pour supprimer un utilisateur dont son id est en paramètre
function deleteUser(filePath, idData) {
    let utilisateurs = readUserData(filePath);
    const idUtilisateurASupprimer = parseInt(idData);
    const indexUtilisateurASupprimer = utilisateurs.findIndex(utilisateur => utilisateur.identifiant === idUtilisateurASupprimer);

    if (indexUtilisateurASupprimer !== -1) {
        utilisateurs.splice(indexUtilisateurASupprimer, 1);

        deleteBlog('./database/blogs.json', idData); // On supprime aussi le blog lié à l'utilisateur

        fs.writeFileSync(filePath, JSON.stringify(utilisateurs, null, 2));

        console.log("Utilisateur supprimé !");
        return true;
    } else {
        console.log("Aucun utilisateur avec l'identifiant " + idUtilisateurASupprimer + " n'a été trouvé.");
        return false;
    }
}

// Fonction utilisée pour connecter l'utilisateur au site
function connectUser(filePath, mail, password) {
    const utilisateurs = readUserData(filePath);
    const utilisateur = utilisateurs.find(utilisateur => utilisateur.email === mail);

    if (!utilisateur) {
        throw new Error(`Utilisateur "${mail}" non trouvé.`);
    }

    if(!utilisateur.motDePasse === password) {
        throw new Error(`Utilisateur ${password} mauvais.`);
    }

    console.log(mail);
    console.log(password);

    if(utilisateur.motDePasse === password) {
        return utilisateur;
    }

    return undefined;
}

module.exports = {
    readUserData,
    createUser,
    modifyUser,
    deleteUser,
    connectUser,
};