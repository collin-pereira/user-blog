const joi = require('@hapi/joi')

exports.userSchema = joi.object({
    firstName: joi.string()
        .required()
        .min(2)
        .max(20)
        .messages({
            'string.base': "first name must be a string",
            'string.empty': "first name is required",
            'string.min':"first name must be atleast 2 chars long",
            'string.max': "first name cannot be more that 20 character long"
        }),
    lastName: joi.string()
    .required()
    .min(2)
    .max(20)
    .messages({
        'string.base': "last name must be a string",
        'string.empty': "last name is required",
        'string.min':"last name must be atleast 2 chars long",
        'string.max': "last name cannot be more that 20 character long"
    }),
    email: joi.string()
    .required()
    .email()
    .messages({
        'string.base': "email must be a string",
        'string.empty': "email is required",
        'string.email': "invalid email ID",
    }),
    password: joi.string()
    .required()
    .min(6)
    .max(20)
    .messages({
        'string.base': "password must be a string",
        'string.empty': "password is required",
        'string.min':"password must be atleast 6 chars long",
        'string.max': "password cannot be more that 20 character long"
    })
})