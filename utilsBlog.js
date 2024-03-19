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
        if (blogs[i].droitAcces.length === 0 || blogs[i].droitAcces.contains(idUser)) {
            blogsDisponibles.add(blogs[i]);
        }
    }
}

function createBlog(filepath, user) {
    let blogs = readBlogData(filepath);

    const blog = {
        identifiant : user.identifiant,
        nom: `Blog de ${user.nom}`,
        id_auteur: user.identifiant,
        droitAcces: [
            user.identifiant
        ]
    }

    //blogs.add(blog);

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));

    return blog.identifiant;
}

function addRight(filepath, idBlog, idUser, numRight) {
    let blogs = readBlogData(filepath);

    let blog = blogs.find(blog => blog.identifiant === idBlog);

    blog.droitAcces.add(idUser);

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

function suppressRight(filepath, idBlog, idUser, numRight) {
    let blogs = readBlogData(filepath);

    let blog = blogs.find(blog => blog.identifiant === idBlog);

    blog.droitAcces.remove(idUser);

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

module.exports = {
    readBlogData,
    createBlog,
};