const { User, Account } = require('../models/index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/decoded_token')

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

      // Criando um novo usuário
      const user = new User({
        name,
        email,
        password: passwordBcrypt,
        confirmpassword: passwordBcrypt
      })

      const newUser = user.save()

      // Criando uma conta com os dados do usuário
      const account = new Account({
        UserId: user.id,
        deposit: 0,
        withdrawal: 0,
        entryTotal: 0,
        outputTotal: 0,
        balence: 0
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

      // Verificando se o email ja existe no db
      const user = await User.findOne({ email })
      if (!user) throw new Error('E-mail ou senha Inválida')

      // Comparando as senhas que vem do req e a do db
      const checkPassword = bcrypt.compare(password, user.password)
      if (!checkPassword) throw new Error('E-mail ou senha Inválida')

      createToken(user, res)
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body

      const token = getToken(req)
      const decoded = decodedToken(token)

      const user = await User.findOne({ _id: decoded.id })

      // Verificar se as Senhas São iguais
      if (password !== confirmpassword)
        throw new Error('A senha e a Confirmação de senha precisam ser igual')

      // Deixando a senha criptografado
      const salt = await bcrypt.genSalt(12)
      const passwordBcrypt = await bcrypt.hash(password, salt)

      // Atualizando os dados do usuário
      await User.findByIdAndUpdate(user.id, {
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
