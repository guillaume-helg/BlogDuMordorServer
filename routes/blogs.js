const { readFileData} = require('../utilsBlog.js');
const express = require('express');
const {addRight, setBlogPublic, setBlogPrivate, readBlogData} = require("../utilsBlog");

const filePath = './database/blogs.json'

const router = express.Router();

// Route pour récupérer tous les blogs
router.get('/', getBlogs);

router.post('/invite', inviteUser);

router.post('/public', setToPublic);

router.post('/private', setToPrivate);


module.exports = router;


// Récupére la liste des blogs et la retourne
function getBlogs(req, res) {
    res.json(readBlogData(filePath, res));
}

// Ajoute un utilisateur à un blog
function inviteUser(req, res) {
    addRight(filePath, req.body.idBlog, req.body.idUser);
}

// Change la visibilité d'un blog en public
function setToPublic(req, res) {
    setBlogPublic(filePath, req.body.idBlog);
}

// Change la visibilité d'un blog en privé
function setToPrivate(req, res) {
    setBlogPrivate(filePath, req.body.idBlog);
}
