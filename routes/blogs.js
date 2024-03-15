const { readFileData} = require('../utilsBlog.js');
const express = require('express');
const fs = require('fs');

const filePath = './database/blogs.json'

const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getBlogs);

// Route pour modifier un blog, notamment ses droits d'acces
router.post('/modify', modifyBlog);


module.exports = router;


// Récupére la liste des blogs et la retourne
function getBlogs(req, res) {
    res.json(readFileData(filePath, res));
}

function modifyBlog(req, res) {
}
