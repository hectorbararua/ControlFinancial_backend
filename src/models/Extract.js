const mongoose = require('mongoose')

const ExtractSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  value: {
    type: Number
  },
  descriptionValue: {
    type: String
  },
  type: {
    type: String
  }
})

const Extract = mongoose.model('Extract', ExtractSchema)

module.exports = Extract
