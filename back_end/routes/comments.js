// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const commentCtrl = require('../controllers/comments');

//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route qui permet de créer un post
router.post('/', commentCtrl.createComment);