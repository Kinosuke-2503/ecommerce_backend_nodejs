'use strict'

const express = require('express')

const router = express.Router()
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const { authentication } = require('../../auth/authUtils')

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.login))

router.use(authentication)

router.post('/shop/logout', asyncHandler(accessController.logout))

module.exports = router
