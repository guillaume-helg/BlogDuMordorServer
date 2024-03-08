const { readFileData} = require('../utilsBlog.js');
const express = require('express');
const fs = require('fs');

const filePath = './database/blogs.json'

const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getBlogs);

// Route pour ajouter un nouvel article
router.post('/add', addBlog);

router.post('/modify', modifyBlog);

// Route pour supprimer un article
router.delete('/remove', deleteBlog);

module.exports = router;


function getBlogs(req, res) {
    res.json(readFileData(filePath, res));
}

function addBlog(req, res) {

}

function modifyBlog(req, res) {

}

function deleteBlog(req, res) {

}