const schema = require('./schemas')

/**
 * form validation for new user
 */
const newUserValidator = (req, res, next) => {
    const { error } = schema.userSchema.validate(req.body)
    error ? res.status(400).send(error) : next()
}

/**
 * form validation for new post
 */
const newPostValidator = (req, res, next) => {
    const { error } = schema.postSchema.validate(req.body)
    error ? res.status(400).send(error) : next()
}

const newCommentValidator =(req,res,next)=>{
    const { error } = schema.commentSchema.validate(req.body)
    error ? res.status(400).send(error) : next()
}

module.exports = {
    newUserValidator,
    newPostValidator,
    newCommentValidator
}