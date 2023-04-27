require('dotenv/config')
const express = require('express')

const app = express()
const db = require('./src/db/conn')

// Config JSON

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true
  })
)

// Models
const { User } = require('./src/models/index')

app.listen(process.env.SERVER_PORT)
