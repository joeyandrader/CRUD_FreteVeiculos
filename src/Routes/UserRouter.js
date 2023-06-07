const router = require('express').Router()
const PersonController = require('../Controllers/PersonController');

router.post('/registerUser', PersonController.RegisterUser);

module.exports = router