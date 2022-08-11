const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/me', AuthMiddleware.authenticate, UserController.me);
router.get('/generate-password', UserController.generatePassword);
router.delete('/', UserController.destroyByEmail);

module.exports = router;