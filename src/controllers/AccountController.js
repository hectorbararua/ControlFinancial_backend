const { Account, Extract } = require('../models/index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')

module.exports = class AccountController {
  static async deposit(req, res) {
    try {
      const { deposit, description } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      // Busca a conta pelo id do usuário
      const account = await Account.findOne({ UserId: decoded.id })

      // Depositando o valor na conta
      const updated = await Account.findByIdAndUpdate(account.id, {
        deposit,
        description,
        entryTotal: (account.entryTotal += deposit),
        balence: (account.balence += deposit)
      })

      const extract = new Extract({
        UserId: decoded.id,
        value: deposit,
        descriptionValue: description,
        type: 'Entry'
      })

      await extract.save()

      res.status(200).json({
        message: 'Deposito Realizado!',
        deposit,
        description
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async withdrawal(req, res) {
    try {
      const { withdrawal, description } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      // Busca a conta pelo id do usuário
      const account = await Account.findOne({ UserId: decoded.id })

      if (withdrawal > account.balence) throw new Error('Saldo insuficiente')
      // Depositando o valor na conta
      const updated = await Account.findByIdAndUpdate(account.id, {
        withdrawal,
        description,
        outputTotal: (account.outputTotal += withdrawal),
        balence: (account.balence -= withdrawal)
      })

      const extract = new Extract({
        UserId: decoded.id,
        value: withdrawal,
        descriptionValue: description,
        type: 'Output'
      })

      await extract.save()

      res.status(200).json({
        message: 'Saque Realizado!',
        withdrawal,
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
