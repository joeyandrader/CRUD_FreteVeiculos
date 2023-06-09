const router = require('express').Router()
const PersonController = require('../Controllers/PersonController');
const { DeliveryAuth, VerifyToken } = require("../Helpers/AuthAccess")

router.post('/registerUser', PersonController.RegisterUser);
router.get('/myshippings', DeliveryAuth, PersonController.MyShippings)
router.post('/byaccess', VerifyToken, PersonController.byAccess)
router.put('/removeShipping', DeliveryAuth, PersonController.RemoveShipping)

module.exports = router