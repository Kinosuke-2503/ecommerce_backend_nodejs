'use strict'

const jwt = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { BadRequestError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')

const HEADERS = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

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

const authentication = asyncHandler(async(req, res, next) => {
    const userId = req.headers[HEADERS.CLIENT_ID]

    if (!userId) {
        throw new BadRequestError('Unauthorized')
    }

    const keyStore = await findByUserId(userId)

    if (!keyStore) {
        throw new BadRequestError('Unauthorized')
    }

    const accessToken = req.headers[HEADERS.AUTHORIZATION]

    if (!accessToken) {
        throw new BadRequestError('Unauthorized')
    }

    try {
        const decodeUser = jwt.verify(accessToken, keyStore.publicKey)

        if (userId !== decodeUser.userId) {
            throw new BadRequestError('Unauthorized')
        }

        req.keyStore = keyStore

        return next()
    } catch (error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    authentication,
}
