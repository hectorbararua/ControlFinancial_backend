const { Account } = require('../models/index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')

module.exports = class AccountController {
  static async deposit(req, res) {
    try {
      const { deposit } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      // Busca a conta pelo id do usuário
      const account = await Account.findOne({ UserId: decoded.id })

      // Depositando o valor na conta
      const updated = await Account.findByIdAndUpdate(account.id, {
        deposit,
        entryTotal: (account.entryTotal += deposit),
        balence: (account.balence += deposit)
      })

      res.status(200).json({
        message: 'Deposito Realizado!',
        deposit
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async withdrawal(req, res) {
    try {
      const { withdrawal } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      // Busca a conta pelo id do usuário
      const account = await Account.findOne({ UserId: decoded.id })

      if (withdrawal > account.balence) throw new Error('Valor Indisponível')
      // Depositando o valor na conta
      const updated = await Account.findByIdAndUpdate(account.id, {
        withdrawal,
        outputTotal: (account.outputTotal += withdrawal),
        balence: (account.balence -= withdrawal)
      })

      res.status(200).json({
        message: 'Saque Realizado!',
        withdrawal
      })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async seeAccount(req, res) {
    const token = getToken(req)
    const decoded = decodedToken(token)

    // Busca a conta pelo id do usuário
    const account = await Account.findOne({ UserId: decoded.id })

    res.status(200).json(account)
  }
}
