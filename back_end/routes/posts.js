/* ********** Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les posts ********** */

// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

//const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');

const authAdmin = require('../middleware/authAdmin');

//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route  post
router.post('/', postCtrl.createPost);
router.get('/', authAdmin, postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id',postCtrl.deletePost);

router.post('/like/:user_id/:post_id', postCtrl.likePost);
router.post('/dislike/:user_id/:post_id', postCtrl.dislikePost);
router.delete('/resetLikes/:user_id/:post_id', postCtrl.resetLikes);



module.exports = router;