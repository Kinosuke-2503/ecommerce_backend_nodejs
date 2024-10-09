'use strict'

const { findById } = require("../services/apikey.service")

const HEADERS = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADERS.API_KEY]?.toString()

        if (!key) {
            return res.status(403).json({
                message: 'Unauthorized',
            })
        }

        const apiKey = await findById(key)

        if (!apiKey) {
            return res.status(403).json({
                message: 'Unauthorized',
            })
        }

        req.apiKey = apiKey

        return next()
    } catch (error) {
        return error
    }
}

const permission = ( permission ) => {
    return (req, res, next) => {
        if (!req.apiKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied',
            })
        }

        const hasPermission = req.apiKey.permissions.includes(permission)

        if (!hasPermission) {
            return res.status(403).json({
                message: 'Permission denied',
            })
        }

        return next()
    }
}

module.exports = {
    apiKey,
    permission,
}
