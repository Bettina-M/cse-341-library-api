const controller = require('../controller/userController');
const validator = require('../validator/uservalidator')
const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require("../middlware/auth");

router.post('/',  validator.validateUser, validator.userValidationCheck, controller.registerUser)

router.post('/login', validator.userValidationCheck,controller.loginUser)

router.get('/:id', ensureAuthenticated, controller.getUserbyId)

router.get('/', ensureAuthenticated, controller.getAllUsers)

router.post('/logout', controller.logoutUser)

router.put('/:id,', ensureAuthenticated, validator.userValidationCheck, controller.updateUser)

router.delete('/:id', ensureAuthenticated, controller.deleteUser)

module.exports = router