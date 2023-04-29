const router = require('express').Router()
const AccountController = require('../controllers/AccountController')

//middlewares
const verifyToken = require('../middlewares/verifyToken')

router
  .patch('/deposit', verifyToken, AccountController.deposit)
  .patch('/withdrawal', verifyToken, AccountController.withdrawal)
  .get('/', verifyToken, AccountController.seeAccount)

module.exports = router
