const User = require('../models/User')
const Account = require('../models/Account')

const bcrypt = require('bcrypt')

// helpers
const createToken = require('../helpers/create_user_token')

module.exports = class UserController {
  static async register(req, res) {
    try {
      // Pegando Dados do Body
      const { name, email, password, confirmpassword } = req.body

      // Verificar se as Senhas São iguais
      if (password !== confirmpassword)
        throw new Error('A senha e a Confirmação de senha precisam ser igual')

      // Verificar se o email existe no db
      const emailExists = await User.findOne({ email })

      if (emailExists) throw new Error('E-mail já Existente!')

      // Deixando a senha criptografado
      const salt = await bcrypt.genSalt(12)

      const passwordBcrypt = await bcrypt.hash(password, salt)

      const user = new User({
        name,
        email,
        password: passwordBcrypt,
        confirmpassword: passwordBcrypt
      })

      const newUser = user.save()

      const account = new Account({
        UserId: user.id
      })

      const newAccount = account.save()

      res.status(201).json({ message: 'Você está registrado com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) throw new Error('E-mail ou senha Inválida')

      const checkPassword = bcrypt.compare(password, user.password)
      if (!checkPassword) throw new Error('E-mail ou senha Inválida')

      createToken(user, res)
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const { name, email, password, confirmpassword } = req.body

      // Verificar se as Senhas São iguais
      if (password !== confirmpassword)
        throw new Error('A senha e a Confirmação de senha precisam ser igual')

      // Deixando a senha criptografado
      const salt = await bcrypt.genSalt(12)
      const passwordBcrypt = await bcrypt.hash(password, salt)

      const updated = await User.findByIdAndUpdate(id, {
        name,
        email,
        password: passwordBcrypt,
        confirmpassword: passwordBcrypt
      })

      res.status(200).json({ message: 'Usuário Atualizado com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
