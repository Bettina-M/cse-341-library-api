const controller = require('../controller/userController');
const validator = require('../validator/uservalidator')
const express = require('express')
const router = express.Router()

router.post('/',validator.userValidationCheck, validator.validateUser, controller.registerUser)
router.get('/', controller.getAllUsers)
router.put('/:id', validator.userValidationCheck, validator.validateUser, controller.updateUser)
router.delete('/:id', controller.deleteUser)
module.exports = router