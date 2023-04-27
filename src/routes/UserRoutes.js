const router = require('express').Router()
const UserController = require('../controllers/UserController')

// validations
const UserValidationCreate = require('../validations/User/create')
const UserValidationUpdate = require('../validations/User/update')
const LoginValidation = require('../validations/Auth/login')

//middlewares
const verifyToken = require('../middlewares/verifyToken')

router
  .post('/', UserValidationCreate, UserController.register)
  .post('/login', LoginValidation, UserController.login)
  .patch('/:id', verifyToken, UserValidationUpdate, UserController.update)

module.exports = router
