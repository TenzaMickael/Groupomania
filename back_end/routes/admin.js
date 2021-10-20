
/* ***** ROUTE ADMIN.JS ***** */


// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

//Appel du fichier "authAdmin.js" pour l'authentification
const authAdmin = require('../middleware/authAdmin');

// On associe les fonctions aux différentes routes, on importe le controller
const adminCtrl = require('../controllers/admin');


// Créer un utilisateur
router.post('/', authAdmin , adminCtrl.addUser);

//Supprimer un utilisateur
router.delete('/users', authAdmin, adminCtrl.deleteUsers);

//Supprimer un commentaire
router.delete('/comments', authAdmin, adminCtrl.deleteComments);

//Supprimer un post
router.delete('/posts', authAdmin, adminCtrl.deletePosts);


module.exports = router;