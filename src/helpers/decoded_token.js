const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

const decodedToken = token => {
  jwt.verify(token, secret)
}

module.exports = decodedToken
