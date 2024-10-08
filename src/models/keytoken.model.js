'use strict'

const mongoose = require('mongoose')

const COLLECTION_NAME = 'keys'
const DOCUMENT_NAME = 'Key'

const keyTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop',
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: [],
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
})

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema)
