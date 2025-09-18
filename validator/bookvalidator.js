const express = require('express')
const {body, validationResult} = require('express-validator')

const validateBook =[
body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim()
    .escape(),

body('author')
    .notEmpty()
    .withMessage('Author name required')
    .trim()
    .escape(),

body('genre')
    .notEmpty()
    .withMessage('Genre of the book required')
    .trim()
    .escape(),

body('publishedYear')
    .notEmpty()
    .withMessage('published year required')
    .isInt({min: 1800, max: new Date().getFullYear()}+ 5)
    .withMessage('Published year must be a valid year'),

body('available')
    .optional()
    .isBoolean()
]

const validationCheck = (req, res, next) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: 'Validation error',
            details: errors.array().map(err=>({
                field: err.param,
                message: err.msg,
                value: err.value
            }))
        })
    }
    next()
}

module.exports ={validateBook, validationCheck}