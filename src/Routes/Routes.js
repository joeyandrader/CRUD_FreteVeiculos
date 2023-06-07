const IndexController = require('../Controllers/IndexController')
const router = require('express').Router()

router.get('/', IndexController.Index);

module.exports = router