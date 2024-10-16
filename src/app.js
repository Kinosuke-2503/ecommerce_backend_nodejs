const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./dbs/init.mongodb')

app.use('/', require('./routes'))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404

    next(error)
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500

    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: err.message || 'Internal Server Error',
    })
})

module.exports = app
