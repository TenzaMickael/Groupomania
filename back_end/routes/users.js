const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/',userCtrl.createUser);
router.put('/:id',userCtrl.modifyUser);
router.delete('/:id',userCtrl.deleteUser);
router.get('/',userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);

module.exports = router;

