const joi = require('@hapi/joi')

exports.postSchema = joi.object({
    title: joi.string()
        .required()
        .min(6)
        .max(255)
        .messages({
            'string.base': "title must be a string",
            'string.empty': "title is required",
            'string.min': "title must be atleast 6 chars long",
            'string.max': "title cannot be more that 255 character long"
        }),
    body: joi.string()
        .required()
        .min(5)
        .messages({
            'string.base': "body must be a string",
            'string.empty': "body is required",
            'string.min': "body must be atleast 5 chars long",
        }),
    userId: joi.string()
        .required()
        .messages({
            'string.base': "user ID must be a string",
            'string.empty': "user ID is required",
        }),
})