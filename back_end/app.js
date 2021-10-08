/* **********FICHIER app.js CONTIENT NOTRE APPLICATION********** */


//* *****Import des packages***** *//

// Importation du Framework Express
const express = require('express');

// Importation du package helmet qui va servir à sécurisé notre application 
const helmet = require('helmet');

// Importation du package body-parser qui permet d'extraire l'objet JSON des requêtes POST
const bodyParser = require('body-parser');

// On demande d'appliquer le package dotenv pour sécurisé des données sensible
require('dotenv').config();


//* *****Déclaration des routes***** *//
// On importe la route dédiée aux posts
const postRoutes = require('./routes/posts');

// On importe la route dédiée aux utilisateurs
const userRoutes = require('./routes/users');

// On importe la route dédié aux commentaires 
const commentRoutes = require('./routes/comments');


// Création d'une application express   
const app = express();

// Application du package helmet dans notre application
app.use(helmet());

// Middleware Header qui permet à toutes les demandes de toutes les origines d'accéder à l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware qui permet de transformer le corp de la requête en un objet JSON utilisable
app.use(bodyParser.json());


// Routes dédiées aux posts
app.use('/api/posts', postRoutes);

// Routes dédiées aux users
app.use('/api/users', userRoutes);

// Route dédiés aux commentaires
app.use('/api/comments' , commentRoutes);


// Export de l'application express pour y accéder depuis server.js
module.exports = app;

