/* ********** Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les posts ********** */

// Importation du Framework Express
const express = require('express');

// Appel du router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const postCtrl = require('../controllers/posts');

//* *****Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers***** *//

// Route qui permet de créer un post
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.get('/:id', postCtrl.getOnePost);
router.delete('/:id', postCtrl.deletePost);


module.exports = router;