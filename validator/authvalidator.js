const { body } = require("express-validator")

exports.registerValidation = [
  body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
  body("name").optional().isString().trim()
]

exports.loginValidation = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty().withMessage("Password required")
];



