'use strict'

const mongoose = require('mongoose')

const COLLECTION_NAME = 'shops'
const DOCUMENT_NAME = 'Shop'

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    verify: {
        type: Boolean,
        default: false,
    },
    role: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

module.exports = mongoose.model(DOCUMENT_NAME, shopSchema)
