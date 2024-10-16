'use strict'

const AccessService = require('../services/access.service')

const { CREATED, SuccessResponse } = require('../core/success.response')

class AccessController {
    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Shop created',
            metadata: await AccessService.signUp(req.body),
        }).send(res)
    }
}

module.exports = new AccessController()
