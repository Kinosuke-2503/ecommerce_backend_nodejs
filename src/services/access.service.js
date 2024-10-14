'use strict'

const bcrypt = require('bcrypt')
const crypto = require('crypto')

const shopModel = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError } = require('../core/error.response')

const ROLE_SHOP = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
    static signUp = async ({ name, email, password }) => {
        const shop = await shopModel.findOne({ email }).lean()

        if (shop) {
            throw new BadRequestError('Shop already exists')
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [ROLE_SHOP.SHOP],
        })

        if (newShop) {
            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            })

            if (!keyStore) {
                throw new BadRequestError('Failed to create key token')
            }

            const tokens = await createTokenPair({
                userId: newShop._id,
                email,
            }, publicKey, privateKey)

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({
                        fields: ['_id', 'name', 'email'],
                        object: newShop,
                    }),
                    tokens,
                },
                status: 'success',
            }
        }

        return {
            code: 201,
            metadata: null
        }
    }
}

module.exports = AccessService
