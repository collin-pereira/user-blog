const { Comment,User,Post } = require('../models')
const helper = require('../helpers/index')

const NOT_FOUND = { message: 'comment not found' }
const SUCCESS = { message: "success" }

const createComment = async (req, res) => {
    try {
        let userExists =await helper.resourceExists(User,req.body.userId)
        let postExists =await helper.resourceExists(Post,req.body.postId)
        if(!userExists) return res.status(404).send({message:"invalid user ID"})
        if(!postExists) return res.status(404).send({message:"Invalid Post ID"})
        const comment = await Comment.create(req.body)
        res.status(201).send(comment)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateComment = async (req, res) => {
    const { id } = req.params
    try {
        await Comment.update(req.body, { where: { id: id } })
        res.status(200).send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteComment = async (req, res) => {
    const { id } = req.params
    try {
        await Comment.destroy({ where: { id: id } })
        res.send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment
}