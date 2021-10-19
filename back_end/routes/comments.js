// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

const auth = require('../middleware/auth');

// On associe les fonctions aux différentes routes, on importe le controller
const commentCtrl = require('../controllers/comments');

//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route commentaire
router.post('/', auth, commentCtrl.createComment);
router.get('/' , commentCtrl.getAllComments);
router.get('/:id' , commentCtrl.getOneComment);
router.put('/', auth, commentCtrl.modifyComment);
router.delete('/', auth, commentCtrl.deleteComment);


router.post('/like', auth,  commentCtrl.likeComment);
router.post('/dislike', auth, commentCtrl.dislikeComment);
router.delete('/resetLikes', auth,  commentCtrl.resetLikes);

module.exports = router;
