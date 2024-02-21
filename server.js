const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); // Ajoutez cette ligne
  next();
});


app.get('/articles', (req, res) => {
  fs.readFile('./database/article.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
      return;
    }

    const articles = JSON.parse(data).articles;

    console.log('Articles lus depuis le fichier :', articles);

    res.json(articles);
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
