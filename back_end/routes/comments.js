
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
router.post('/', auth, commentCtrl.createComment);

//Recherche tout les commentaires
router.get('/' , commentCtrl.getAllComments);

//Recherche un commentaire
router.get('/:id' , commentCtrl.getOneComment);

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
