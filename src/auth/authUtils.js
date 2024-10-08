'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, publicKey, {
            expiresIn: '15m',
        })

        const refreshToken = await jwt.sign(payload, privateKey, {
            expiresIn: '7d',
        })

        return {
            accessToken,
            refreshToken,
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair,
}
