const schema = require('./schemas')

/**
 * form validation for new user
 */
const newUserValidator = (req, res, next) => {
    const { error } = schema.userSchema.validate(req.body)
    error ? res.status(400).send(error) : next()
}

module.exports = {
    newUserValidator,
}