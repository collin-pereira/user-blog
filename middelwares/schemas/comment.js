const joi = require('@hapi/joi')

exports.commentSchema = joi.object({
    comment: joi.string()
        .required()
        .messages({
            'string.base': "comment must be a string",
            'string.empty': "comment is required",
        }),
    userId: joi.string()
        .required()
        .messages({
            'string.base': "user ID must be a string",
            'string.empty': "user ID is required",
        }),
    postId: joi.string()
        .required()
        .messages({
            'string.base': "post ID must be a string",
            'string.empty': "post ID is required",
        }),
})