const controller = require('../controller/userController');
const validator = require('../validator/uservalidator')
const express = require('express')
const router = express.Router()


router.post('/',  validator.validateUser, validator.userValidationCheck, controller.registerUser)
router.post('/login', validator.userValidationCheck,controller.loginUser)
router.post('/logout', controller.logoutUser)

module.exports = router