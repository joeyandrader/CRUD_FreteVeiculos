const router = require('express').Router()
const VehicleController = require('../Controllers/VehicleController');
const { VerifyToken, AdminAuth, DeliveryAuth } = require('../Helpers/AuthAccess');


router.get('/list', AdminAuth, VehicleController.ListVehicle);
router.post('/register', AdminAuth, VehicleController.RegisterVehicle)


module.exports = router