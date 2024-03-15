const fs = require('fs');

// Fonction pour lire les données à partir d'un fichier
function readBlogData(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function readBlogById(filePath, idUser) {
    let blogs = readBlogData(filePath);
    let blogsDisponibles;
    for (let i = 0; i < blogs; i++) {
        if(blogs[i].droitAcces.length === 0 || blogs[i].droitAcces.contains(idUser)) {
            blogsDisponibles.add(blogs[i]);
        }
    }
}

function createNewBlog() {

}

function manageRight() {

}

function addRight() {

}

function suppressRight() {

}

function deleteBlog() {

}

module.exports = {
    readBlogData
};