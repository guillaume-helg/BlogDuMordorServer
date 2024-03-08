const fs = require('fs');

// Fonction pour lire les données à partir d'un fichier
function readFileData(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = {
    readFileData
};