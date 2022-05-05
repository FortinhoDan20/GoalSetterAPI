const express = require('express')
const router = new express.Router()
const { registerUser, login, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/auth')

router.route('/').post(registerUser)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)

module.exports = router
