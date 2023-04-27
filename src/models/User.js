const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  confirmpassword: {
    type: String,
    trim: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
