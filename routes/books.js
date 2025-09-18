const controller = require('../controller/booksController');
const validator = require('../validator/bookvalidator')
const express = require('express')
const router = express.Router()

router.get('/', controller.getAllBooks)

router.get('/:id', controller.getBookById)

router.post('/', validator.validateBook, validator.validationCheck,controller.createBook)

router.put('/:id', validator.validateBook, validator.validationCheck, controller.updateBook)

router.delete('/:id', controller.deleteBook)

module.exports = router