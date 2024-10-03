const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

require('./dbs/init.mongodb')

app.use('/', require('./routes'))

module.exports = app
