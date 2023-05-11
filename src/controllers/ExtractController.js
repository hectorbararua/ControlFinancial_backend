const { Extract, Account } = require('../models/index')
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

  static async delete(req, res) {
    try {
      const { id } = req.params

      const token = getToken(req)
      const decoded = decodedToken(token)

      const extract = await Extract.findById(id)

      const account = await Account.findOne({ UserId: decoded.id })

      const updatedParams =
        extract.type === 'withdrawal'
          ? {
              amount: extract.value,
              outputTotal: (account.outputTotal -= extract.value),
              balence: (account.balence += extract.value)
            }
          : {
              amount: extract.value,
              entryTotal: (account.entryTotal -= extract.value),
              balence: (account.balence -= extract.value)
            }

      await Account.findByIdAndUpdate(account.id, updatedParams)

      await Extract.findByIdAndDelete(id)

      res.status(200).json('Excluido com successo')
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
