'use strict'

const apikeyModel = require('../models/apikey.model')

const findById = async ( key ) => {
    const apiKey = await apikeyModel.findOne({
        key,
        status: true,
    }).lean()

    return apiKey
}

module.exports = {
    findById,
}
