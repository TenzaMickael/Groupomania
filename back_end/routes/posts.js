
/* ***** ROUTE POSTS.JS ***** */


// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

//Appel du fichier "auth.js" pour l'authentification
const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const postCtrl = require('../controllers/posts');



// Créer un post
router.post('/', auth, postCtrl.createPost);

//Recherche tout les posts
router.get('/', postCtrl.getAllPosts);

//Recherche un post
router.get('/:id', postCtrl.getOnePost);

//Modifie un post
router.put('/', auth, postCtrl.modifyPost);

//Supprime un post
router.delete('/', auth, postCtrl.deletePost);

//Like un post
router.post('/like', auth, postCtrl.likePost);

//Dislike un post
router.post('/dislike', auth,  postCtrl.dislikePost);

//Réinitialise les likes/dislikes
router.delete('/resetLikes', auth , postCtrl.resetLikes);


module.exports = router;