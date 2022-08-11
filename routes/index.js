const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserRules = require('../validations/UserRules');

router.post('/login', AuthController.login);
router.post('/register', UserRules.register, UserRules.execute, AuthController.register);


module.exports = router;