

/* ***** ROUTE USERS.JS ***** */

// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

//Appel du fichier "auth.js" pour l'authentification
const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/users');



//Création d'un utilisateur
router.post('/signup', userCtrl.signup);

//Connection d'un utilisateur
router.post('/login', userCtrl.login);

//recherche tous les utilisateurs
router.get('/',userCtrl.getAllUsers);

//Modifie un utilisateur
router.put('/', auth, userCtrl.modifyUser);

//Supprime un utilisateur
router.delete('/', auth, userCtrl.deleteUser);


module.exports = router;

