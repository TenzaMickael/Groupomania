
/* ***** ROUTE COMMENTS.JS ***** */


// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

//Appel du fichier "auth.js" pour l'authentification
const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const commentCtrl = require('../controllers/comments');



// Créer un  commentaire
router.post('/create', auth, commentCtrl.createComment);

//Recherche tout les commentaires
router.post('/' , auth, commentCtrl.getAllComments);

//Recherche un commentaire
router.post('/:id' , auth,  commentCtrl.getOneComment);

//Modifie un commentaire
router.put('/', auth, commentCtrl.modifyComment);

//Supprime un commentaire
router.delete('/', auth, commentCtrl.deleteComment);

//Like un commentaire
router.post('/like', auth,  commentCtrl.likeComment);

//Dislike un commentaire
router.post('/dislike', auth, commentCtrl.dislikeComment);

//Réinitialise les likes/dislikes
router.delete('/resetLikes', auth,  commentCtrl.resetLikes);


module.exports = router;
