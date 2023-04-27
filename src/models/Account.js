const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  entryTotal: {
    type: Number,
    trim: true
  },
  outputTotal: {
    type: Number,
    trim: true
  },
  balence: {
    type: Number,
    trim: true
  },
  deposit: {
    type: Number,
    trim: true
  },
  withdrawal: {
    type: Number,
    trim: true
  }
})

const Account = mongoose.model('Account', AccountSchema)

module.exports = Account
