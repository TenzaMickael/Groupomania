// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const commentCtrl = require('../controllers/comments');

//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route qui permet de créer un post
router.post('/:user_id/:post_id', auth, commentCtrl.createComment);
router.put('/:user_id/:id', auth, commentCtrl.modifyComment);
router.delete('/:user_id/:id', auth, commentCtrl.deleteComment);
router.get('/' , auth, commentCtrl.getAllComments);
router.get('/:user_id/:id' , auth, commentCtrl.getOneComment);
router.post('/like/:user_id/:comment_id', auth, commentCtrl.likeComment);
router.post('/dislike/:user_id/:comment_id', auth, commentCtrl.dislikeComment);
router.delete('/resetLikes/:user_id/:comment_id', auth, commentCtrl.resetLikes);

module.exports = router;