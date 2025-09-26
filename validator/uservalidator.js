const {body, validationResult} = require('express-validator')

exports.validateUser =[
    body('userName')
    .notEmpty()
    .withMessage('Enter a username'),
    
    body('email')
    .notEmpty()
    .withMessage('Enter a valid email')
    .isEmail(),

    body('password')
    .notEmpty()
    .withMessage('Enter a password')


]


exports.userValidationCheck = (req, res, next) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            error: 'User Validation Error',
            details: errors.array().map(err=>({
                field: err.param,
                message: err.msg,
                value: err.value
            }))
        })
    }
    next()
}

