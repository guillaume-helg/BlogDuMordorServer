const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

// Routes pour la gestion des articles
app.get('/articles', getArticles);
app.delete('/articles/:id', deleteArticle);
app.post('/articles', addArticle);

// Routes pour la gestion des profils utilisateurs
app.post('/login', loginUser);
app.post('/signup', signupUser);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Fonction pour récupérer tous les articles
function getArticles(req, res) {
  readFileData('./database/article.json', res);
}

// Fonction pour ajouter un nouvel article
function addArticle(req, res) {
  const nouvelArticle = req.body; // Supposons que req.body contient les détails du nouvel article à ajouter

  fs.readFile('./database/articles.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier JSON :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }

    try {
      const articles = JSON.parse(data);
      articles.push(nouvelArticle); // Ajouter le nouvel article au tableau

      fs.writeFile('./database/articles.json', JSON.stringify({ articles }), 'utf8', (err) => {
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

// Fonction pour supprimer un article
function deleteArticle(req, res) {
  const articleId = req.params.id; // Supposons que l'identifiant de l'article à supprimer soit passé en tant que paramètre d'URL

  fs.readFile('./database/articles.json', 'utf8', (err, data) => {
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

      fs.writeFile('./database/articles.json', JSON.stringify({ articles }), 'utf8', (err) => {
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


// Fonction pour lire les données à partir d'un fichier
function readFileData(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
      return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
}

// Fonction pour lire les données utilisateur
function readUserData(email, password, res) {
  fs.readFile('profiles.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur de lecture du fichier JSON :', err);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    try {
      const profiles = JSON.parse(data);
      const user = profiles.find(profile => profile.email === email && profile.mot_de_passe === password);
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
