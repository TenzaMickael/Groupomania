const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/',userCtrl.getAllUsers);
router.put('/', auth, userCtrl.modifyUser);
router.delete('/', userCtrl.deleteUser);

//router.get('/admin', auth ,userCtrl.userAdmin);





module.exports = router;

