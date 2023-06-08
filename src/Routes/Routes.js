const IndexController = require('../Controllers/IndexController')
const router = require('express').Router()
const verifyToken = require('../Helpers/VerifyToken');


//Rotas
router.get('/', verifyToken, IndexController.Index); // teste token
router.post('/login', IndexController.Login);

module.exports = router