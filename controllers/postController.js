const { Post, User, Comment } = require('../models')
const helper = require('../helpers/index')

const NOT_FOUND = { message: 'post not found' }
const SUCCESS = { message: "success" }

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).send(post)
    } catch (error) {
        let status = error.name === "SequelizeUniqueConstraintError" ? 409 : 500
        res.status(status).send(error.errors)
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                attributes:{
                    exclude:['password']
                }
            }]
        })
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getPost = async (req, res) => {
    const { id } = req.params
    try {
        let exist = await helper.resourceExists(Post, id)
        if (!exist) return res.status(404).send(NOT_FOUND)
        const post = await Post.findByPk(id, {
            include: [{
                model: User,
                attributes:{
                    exclude:['password']
                }
            }]
        })
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params
    try {
        await Post.update(req.body, { where: { id: id } })
        res.status(200).send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        await Post.destroy({ where: { id: id } })
        res.send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getPostComments = async (req, res) => {
    const { id } = req.params
    try {
        const comments = await Comment.findAll({ where: { postId: id } })
        res.status(200).send(comments)
    } catch (error) {
        res.send(500).send(error)
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost,
    getPostComments
}