const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(499).json({ message: 'Acesso Negado!' })
  }

  const token = getToken(req)

  if (!token) {
    return res.status(499).json({ message: 'Acesso Negado!' })
  }

  try {
    const verify1 = decodedToken(token)
    req.user = verify1

    next()
  } catch (error) {
    return res.status(498).json({ message: 'Token Inválido!' })
  }
}

module.exports = checkToken
