const router = require('express').Router()
const AccountController = require('../controllers/AccountController')

//middlewares
const verifyToken = require('../middlewares/verifyToken')

router
  .patch('/', verifyToken, AccountController.transaction)
  .get('/', verifyToken, AccountController.seeAccount)

module.exports = router
