const controller = require('../controller/booksController')
const validator = require('../validator/bookvalidator')
const { ensureAuthenticated } = require("../middlware/auth");
//const {requiresAuth} = require('express-openid-connect')
const express = require('express')
const router = express.Router()

router.get('/', controller.getAllBooks)

router.get('/:id', controller.getBookById)

//Protected routes

router.post('/', ensureAuthenticated, validator.validateBook, validator.validationCheck,controller.createBook)
/* #swagger.security = [{
      "oauth2": ["read:books"]
}] */

router.put('/:id', ensureAuthenticated,validator.validateBook, validator.validationCheck, controller.updateBook)
/* #swagger.security = [{
      "oauth2": ["read:books"]
}] */

router.delete('/:id', ensureAuthenticated,controller.deleteBook)
/* #swagger.security = [{
      "oauth2": ["read:books"]
}] */

module.exports = router