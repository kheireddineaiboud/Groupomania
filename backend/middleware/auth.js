// MODULES
const env = process.env; // Récupère les variables d'environnement
const jwt = require("jsonwebtoken"); // Crée et check un token d'identification sécurisé
// FIN MODULES

// MIDDLEWARE AUTH
module.exports = (req, res, next) => { // Check si le token est bon
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, env.TOKEN);
        req.userId = docodedToken.userID;
        res.locals.userID = decodedToken.userID;
        next();
    } catch{
        res.status(401).json({message: 'Requête invalide!'});
    }
};
