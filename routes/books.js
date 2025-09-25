const controller = require('../controller/booksController')
const validator = require('../validator/bookvalidator')
const {requiresAuth} = require('express-openid-connect')
const express = require('express')
const router = express.Router()

router.get('/', controller.getAllBooks)

router.get('/:id', controller.getBookById)

//Protected routes

router.post('/', requiresAuth(), validator.validateBook, validator.validationCheck,controller.createBook)

router.put('/:id', requiresAuth(), validator.validateBook, validator.validationCheck, controller.updateBook)

router.delete('/:id', requiresAuth(), controller.deleteBook)

module.exports = router