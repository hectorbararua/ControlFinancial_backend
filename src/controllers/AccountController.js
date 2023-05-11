const { Account, Extract } = require('../models/index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')
//
module.exports = class AccountController {
  static async transaction(req, res) {
    try {
      const { operationType, amount, description } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      // Busca a conta pelo id do usuário
      const account = await Account.findOne({ UserId: decoded.id })

      if (operationType === 'withdrawal') {
        if (amount > account.balence) throw new Error('Saldo insuficiente')
      }
      // Depositando o valor na conta

      const updatedParams =
        operationType === 'withdrawal'
          ? {
              amount,
              description,
              outputTotal: (account.outputTotal += amount),
              balence: (account.balence -= amount)
            }
          : {
              amount,
              description,
              entryTotal: (account.entryTotal += amount),
              balence: (account.balence += amount)
            }

      await Account.findByIdAndUpdate(account.id, updatedParams)

      const extract = new Extract({
        UserId: decoded.id,
        value: amount,
        descriptionValue: description,
        type: operationType
      })

      await extract.save()

      const message =
        operationType === 'withdrawal'
          ? 'Saque realizado!'
          : 'Depósito realizado!'

      res.status(200).json({
        message,
        amount,
        description
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async seeAccount(req, res) {
    // Listar a Conta por Id Do Usuário que vem do token
    try {
      const token = getToken(req)
      const decoded = decodedToken(token)

      const account = await Account.findOne({ UserId: decoded.id })

      res.status(200).json(account)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
