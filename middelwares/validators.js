const schema = require('./schemas')
const models = require('../models')
const helper =require('../helpers')

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

const newCommentValidator = (req, res, next) => {
    const { error } = schema.commentSchema.validate(req.body)
    error ? res.status(400).send(error) : next()
}

const isActionAllowed = async (req, res, next) => {
    let resourceName = req.baseUrl.split('/')[2]
    let { id } = req.params

    if (resourceName === 'user') {
        if (id === req.user.id) {
            return next()
        }
        res.status(401).send({ message: "Unauthorized to modify resource" })
    }
    else {
        model = resourceName.charAt(0).toUpperCase() + resourceName.slice(1)
        try {
            let exist = await helper.resourceExists(models[model], id)
            if (!exist) return res.status(404).send({ message: `${model} not found` })
            let resource = await models[model].findByPk(id, { raw: true })
            if (resource.userId === req.user.id) {
                return next()
            }
            res.status(401).send({ message: "Unauthorized to modify resource" })
        } catch (error) {
            res.status(400).send(error)
        }

    }
}

module.exports = {
    newUserValidator,
    newPostValidator,
    newCommentValidator,
    isActionAllowed
}