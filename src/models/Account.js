const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  entryTotal: {
    type: Number
  },
  outputTotal: {
    type: Number
  },
  balence: {
    type: Number
  },
  deposit: {
    type: Number
  },
  withdrawal: {
    type: Number
  }
})

const Account = mongoose.model('Account', AccountSchema)

module.exports = Account