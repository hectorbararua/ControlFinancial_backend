require('dotenv/config')
const mongoose = require('mongoose')

async function db() {
  await mongoose.connect(
    `${process.env.DB_DIALECT}://127.0.0.1:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`
  )

  console.log('Banco de dados conectado com sucesso')
}
db().catch(err => console.log(err))

module.exports = mongoose
