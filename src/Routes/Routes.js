const IndexController = require('../Controllers/IndexController')
const router = require('express').Router()
const { VerifyToken } = require('../Helpers/AuthAccess');


//Rotas
router.get('/', VerifyToken, IndexController.Index); // teste token
router.post('/login', IndexController.Login);

module.exports = router