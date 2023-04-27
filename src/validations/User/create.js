const { validate, Joi } = require('express-validation')

module.exports = validate({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmpassword: Joi.string().min(8)
  })
})
