const { Post, User } = require('../models')

const NOT_FOUND = { message: 'user not found' }
const SUCCESS = { message: "success" }

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).send(post)
    } catch (error) {
        res.send(error)
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User
            }]
        })
        res.status(200).send(posts)
    } catch (error) {
        res.send(error)
    }
}

const getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findByPk(id, {
            include: [{
                model: User
            }]
        })
        res.status(200).send(post)
    } catch (error) {
        res.send(error)
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params

    await Post.update(req.body, { where: { id: id } })
    res.send(SUCCESS)
}

const deletePost = async (req, res) => {
    const { id } = req.params
    await Post.destroy({ where: { id: id } })
    res.send(SUCCESS)
}
module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
}