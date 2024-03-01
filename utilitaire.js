const fs = require('fs');

// Fonction pour lire les données à partir d'un fichier
function readFileData(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
        const jsonData = JSON.parse(data);
        const type = filePath.split('/').pop().split('.')[0];
        res.json(jsonData[type]);
    });
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
};
