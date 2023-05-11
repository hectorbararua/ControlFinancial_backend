const router = require('express').Router()
const ExtractController = require('../controllers/ExtractController')

//middlewares
const verifyToken = require('../middlewares/verifyToken')

router
  .get('/', verifyToken, ExtractController.list)
  .delete('/:id', verifyToken, ExtractController.delete)

module.exports = router
