/* **********FICHIER app.js CONTIENT NOTRE APPLICATION********** */


//* *****Import des packages***** *//

// Importation du Framework Express
const express = require('express');

// Importation du package helmet qui va servir à sécurisé notre application 
const helmet = require('helmet');

// Importation du package body-parser qui permet d'extraire l'objet JSON des requêtes POST
const bodyParser = require('body-parser');

// Importation du package qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier
const path = require('path');

//Récupération du package mysql2 pour se connecter a notre BDD mysql
//const mysql = require('mysql2');

// On demande d'appliquer le package dotenv pour sécurisé des données sensible
require('dotenv').config();


//* *****Déclaration des routes***** *//
// On importe la route dédiée aux sauces
const postRoutes = require('./routes/posts');

// On importe la route dédiée aux utilisateurs
const userRoutes = require('./routes/users');








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

// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images' )));

// Routes dédiées aux posts
app.use('/api/posts', postRoutes);

// Routes dédiées aux users
app.use('/api/users', userRoutes);


// Export de l'application express pour y accéder depuis server.js
module.exports = app;

