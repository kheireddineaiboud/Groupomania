const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("groupomania", "root", 'Paris94800@', {
    dialect: "mysql",
    host: "localhost"
});
try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL! Sequelize');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./models/user.js')(sequelize, Sequelize);
db.articles = require('./models/article.js')(sequelize, Sequelize);
db.likes = require('./models/like.js')(sequelize, Sequelize);
db.comments = require('./models/comment.js')(sequelize, Sequelize);

module.exports = db;