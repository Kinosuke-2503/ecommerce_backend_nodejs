'use strict'

const mongoose = require('mongoose')

const connectString = process.env.DB_CONNECTION_STRING

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(connectString, {
            maxPoolSize: 10,
        })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(error => {
                console.error('Database connection error:', error)
            })
    }

    static getInstance () {
        if (!this.instance) {
            this.instance = new Database()
        }

        return this.instance
    }
}

const instance = Database.getInstance()

module.exports = instance
