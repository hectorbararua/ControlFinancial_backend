const { Extract } = require('../models/index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')

module.exports = class ExtractController {
  static async list(req, res) {
    try {
      const { typeValue } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)
      const findParams = typeValue
        ? {
            UserId: decoded.id,
            type: typeValue
          }
        : {
            UserId: decoded.id
          }

      const extract = await Extract.find(findParams)

      res.status(200).json(extract)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
