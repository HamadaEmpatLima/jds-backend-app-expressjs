const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/product',  AuthMiddleware.authenticate, ProductController.index);
router.get('/admin/product',  AuthMiddleware.authenticate, ProductController.indexAdmin);
router.get('/product/my-product', AuthMiddleware.authenticate, ProductController.myProduct);

module.exports = router;