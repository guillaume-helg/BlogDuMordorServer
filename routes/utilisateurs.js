const { readFileData, readUserData } = require('../utilsUtilisateur');

const express = require('express');
const fs = require('fs');

const router = express.Router();

// Route pour connecter un utilisateur
router.post('/login', loginUser);

// Route pour inscrire un nouvel utilisateur
router.post('/signup', signupUser);

module.exports = router;

// Fonction pour connecter un utilisateur
function loginUser(req, res) {
    const { email, password } = req.body;
    readUserData(email, password, res);
}

// Fonction pour inscrire un nouvel utilisateur
function signupUser(req, res) {
    const newUser = req.body; // Supposons que req.body contient les détails du nouvel utilisateur

    fs.readFile('utilisateurs.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }

        try {
            const utilisateurs = JSON.parse(data);
            utilisateurs.push(newUser); // Ajouter le nouvel utilisateur au tableau

            fs.writeFile('utilisateurs.json', JSON.stringify(utilisateurs), 'utf8', (err) => {
                if (err) {
                    console.error('Erreur d\'écriture du fichier JSON :', err);
                    return res.status(500).json({ error: 'Erreur interne du serveur' });
                }
                res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
            });
        } catch (error) {
            console.error('Erreur lors de l\'analyse du fichier JSON :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
}