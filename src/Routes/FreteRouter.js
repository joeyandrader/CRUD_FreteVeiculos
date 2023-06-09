const router = require('express').Router()
const FreteController = require('../Controllers/FreteController');
const { VerifyToken, AdminAuth, DeliveryAuth } = require('../Helpers/AuthAccess');

router.get('/list/', DeliveryAuth, FreteController.ListFrete);
router.post('/register', AdminAuth, FreteController.RegisterFrete);
router.post('/requestShipping', DeliveryAuth, FreteController.RequestShipping);

module.exports = router