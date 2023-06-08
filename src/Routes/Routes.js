const IndexController = require('../Controllers/IndexController')
const router = require('express').Router()

router.get('/', IndexController.Index);
router.post('/login', IndexController.Login);

module.exports = router