/* ********** Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les posts ********** */

// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const postCtrl = require('../controllers/posts');




//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route  post
router.post('/', auth, postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.put('/', auth, postCtrl.modifyPost);
router.delete('/', auth, postCtrl.deletePost);

router.post('/like', auth, postCtrl.likePost);
router.post('/dislike', auth,  postCtrl.dislikePost);
router.delete('/resetLikes', auth , postCtrl.resetLikes);



module.exports = router;