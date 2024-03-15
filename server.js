const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

// Routage des requêtes
const articlesRouter = require('./routes/articles');
const utilisateursRouter = require('./routes/utilisateurs');
const blogsRouter = require('./routes/blogs');

app.use('/articles', articlesRouter);
app.use('/utilisateurs', utilisateursRouter);
app.use('/blogs', blogsRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});