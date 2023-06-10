const router = require('express').Router()
const ProductController = require('../Controllers/ProductController');
const { VerifyToken, AdminAuth, DeliveryAuth } = require('../Helpers/AuthAccess')

router.get('/list', AdminAuth, ProductController.ListProduct);
router.post('/register', AdminAuth, ProductController.RegisterProduct);
router.put('/productUpdate/', AdminAuth, ProductController.UpdateProduct);

module.exports = router