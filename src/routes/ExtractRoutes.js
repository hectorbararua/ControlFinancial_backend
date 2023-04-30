const router = require('express').Router()
const ExtractController = require('../controllers/ExtractController')

//middlewares
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, ExtractController.list)

module.exports = router
