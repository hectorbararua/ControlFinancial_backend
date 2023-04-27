const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

const createToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    secret
  )

  res.status(200).json({
    message: 'Você está autenticado!',
    token: token,
    userId: user.id,
    name: user.name,
    email: user.email
  })
}

module.exports = createToken
