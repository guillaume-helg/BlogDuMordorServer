const fs = require('fs');

// Fonction pour lire les données à partir d'un fichier
function readBlogData(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Fonction pour retouner tout les blogs auquels l'utilisateur à accès
function readBlogById(filePath, idUser) {
    let blogs = readBlogData(filePath);
    let blogsDisponibles;
    for (let i = 0; i < blogs; i++) {
        if (blogs[i].droitAcces.length === 0 || blogs[i].droitAcces.contains(idUser)) {
            blogsDisponibles.add(blogs[i]);
        }
    }
}

// Fonction qui créer un blog
function createBlog(filepath, user) {
    let blogs = readBlogData(filepath);

    console.log(blogs);

    const blog = {
        identifiant: user.identifiant,
        nom: `Blog de ${user.nom}`,
        idAuteur: user.identifiant,
        idArticles: [
    ],
        droitAcces: [
            user.identifiant
    ]
    }

    console.log(blog);

    blogs.push(blog);

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

// Fonction qui met la visibilité de blog à public
function setBlogPublic(filepath, idBlog) {
    let blogs = readBlogData(filepath);

    let blog = blogs.find(blog => blog.identifiant === idBlog);

    blog.droitAcces.splice(0, blog.droitAcces.length);

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

// Met la visibilité de blog à privé
function setBlogPrivate(filepath, idBlog) {
    let blogs = readBlogData(filepath);

    let blog = blogs.find(blog => blog.identifiant === idBlog);

    blog.droitAcces.splice(0, blog.droitAcces.length);

    blog.droitAcces.add(idBlog); // le idUtilisateur est le même que l'id du blog

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

// Ajoute un accès utilisateur à un blog
function addRight(filepath, idBlog, idUser) {
    let blogs = readBlogData(filepath);

    let blog = blogs.find(blog => blog.identifiant === idBlog);

    blog.droitAcces.add(idUser);

    fs.writeFileSync(filepath, JSON.stringify(blogs, null, 2));
}

// Supprime un blog
function deleteBlog(filePath, idData) {
    let blogs = readBlogData(filePath);
    const idBlogASupprimer = parseInt(idData);
    const indexBlogASupprimer = blogs.findIndex(blog => blog.identifiant === idBlogASupprimer);

    if (indexBlogASupprimer !== -1) {
        blogs.splice(indexBlogASupprimer, 1);

        fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));

        console.log("Blog supprimé !");
        return true;
    } else {
        console.log("Aucun blog avec l'identifiant " + idBlogASupprimer + " n'a été trouvé.");
        return false;
    }
}

function addArticleToBlog(filePath, idBlog, idArticle) {
    let blogs = readBlogData(filePath);

    const blogAModifier = blogs.find(blog => blog.identifiant === idBlog);

    if (blogAModifier) {
        blogAModifier.idArticles.push(idArticle);
        fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
        console.log("article ajouté au blog");
    }
}

function removeArticleToBlog(filePath, idBlog, idArticle) {
    let blogs = readBlogData(filePath);

    const blogAModifier = blogs.find(blog => blog.identifiant === idBlog);

    if (blogAModifier) {
        blogAModifier.idArticles.splice(idArticle, 1);
        fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
        console.log("article ajouté au blog");
    }
}

module.exports = {
    readBlogData,
    createBlog,
    deleteBlog,
    addRight,
    setBlogPublic,
    setBlogPrivate,
    addArticleToBlog,
    removeArticleToBlog
};