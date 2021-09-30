// App.js fait appel aux différentes fonctions implémentées dans l'APi : Accès aux images, aux route User, aux route commentaires
// Middleware Imports
const express = require("express");
const path = require("path");
const auth = require('./middleware/auth');
require("dotenv").config();

// App security
const helmet = require("helmet");

// App Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/article");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment")

//  express App
const app = express();

// Helmet Middleware
app.use(helmet());

// CORS , Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});



// Express Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes aux images , signup , login
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/like",likeRoutes);
app.use("/article",articleRoutes);
app.use("/comment",commentRoutes);
/*
// Error  404
app.use((req, res, next) => {
    const error = new HttpError("Route non trouvée", 404);
    throw error;
});
*/
// appel des models dans la DB
const db = require("./config_db");
db.sequelize.sync();

console.log('app.js');
// App Execution
module.exports = app;