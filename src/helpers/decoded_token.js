const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

const decodedToken = token => {
  return jwt.verify(token, secret)
}

module.exports = decodedToken
