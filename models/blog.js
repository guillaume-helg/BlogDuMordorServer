export class Blog {
    constructor(id, nom, contenu, auteur, droitAccess) {
        this.identifiant = id;
        this.nom = nom;
        this.idAuteur = auteur;
        this.droitAccess = droitAccess;
    }
    // Méthodes pour valider les données, obtenir et modifier le blog
}