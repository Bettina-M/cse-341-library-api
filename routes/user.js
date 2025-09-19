const controller = require('../controller/userController');
const validator = require('../validator/uservalidator')
const express = require('express')
const router = express.Router()

router.post('/',validator.userValidationCheck, validator.validateUser, controller.registerUser)

module.exports = router