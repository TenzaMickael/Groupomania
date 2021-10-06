/* ********** Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les posts ********** */

// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const postCtrl = require('../controllers/posts');

//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route qui permet de créer un post
router.post('/:user_id', postCtrl.createPost);
router.put('/:id/:user_id', postCtrl.modifyPost);
router.delete('/:user_id/:id', postCtrl.deletePost);
router.get('/',postCtrl.getAllPosts);
router.get('/:user_id/:id', postCtrl.getOnePost);
router.post('/like/:user_id/:post_id',postCtrl.likePost);



module.exports = router;