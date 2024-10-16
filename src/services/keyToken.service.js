'use strict'

const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = { user: userId }
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken }
            const options = { upsert: true, new: true }

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return keyTokenModel.findOne({ user: userId }).lean()
    }

    static removeKeyById = async (id) => {
        return keyTokenModel.deleteOne(id)
    }
}

module.exports = KeyTokenService
