require('dotenv/config')
const express = require('express')
const handleError = require('./src/helpers/handleError')
const cors = require('cors')

const app = express()
const db = require('./src/db/conn')

app.use(cors())

// Config JSON

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true
  })
)

// Models
const { User, Account, Extract } = require('./src/models/index')

// Routes

const UserRoutes = require('./src/routes/UserRoutes')
const AccountRoutes = require('./src/routes/AccountRoutes')
const ExtractRoutes = require('./src/routes/ExtractRoutes')

app.use('/user', UserRoutes)
app.use('/account', AccountRoutes)
app.use('/extract', ExtractRoutes)

app.use(handleError)

app.listen(process.env.SERVER_PORT)
