const { Account, Extract } = require('../models/index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')

module.exports = class AccountController {
  static async transaction(req, res) {
    try {
      const { operationType, amount, description } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      // Busca a conta pelo id do usuário
      const account = await Account.findOne({ UserId: decoded.id })

      if (operationType === 'deposit') {
        // Depositando o valor na conta
        const updated = await Account.findByIdAndUpdate(account.id, {
          amount: amount,
          description,
          entryTotal: (account.entryTotal += amount),
          balence: (account.balence += amount)
        })

        const extract = new Extract({
          UserId: decoded.id,
          value: amount,
          descriptionValue: description,
          type: 'Entry'
        })

        await extract.save()

        res.status(200).json({
          message: 'Depósito Realizado!',
          amount,
          description
        })
      } else if (operationType === 'withdrawal') {
        if (amount > account.balence) throw new Error('Saldo insuficiente')
        // Sacando o valor da conta
        const updated = await Account.findByIdAndUpdate(account.id, {
          amount: amount,
          description,
          outputTotal: (account.outputTotal += amount),
          balence: (account.balence -= amount)
        })

        const extract = new Extract({
          UserId: decoded.id,
          value: amount,
          descriptionValue: description,
          type: 'Output'
        })

        await extract.save()

        res.status(200).json({
          message: 'Saque Realizado!',
          amount,
          description
        })
      } else {
        throw new Error('Selecione o tipo da operação!')
      }
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
