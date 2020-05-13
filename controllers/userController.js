const User = require('../models').User
const userExists = require('../helpers').resourceExists
const NOT_FOUND = { message: 'user not found' }
const SUCCESS = { message: "success" }

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).send(user)
    } catch (error) {
        let status = error.name === "SequelizeUniqueConstraintError" ? 409 : 500
        res.status(status).send(error.errors)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUser = async (req, res) => {
    let { id } = req.params

    try {
        const user = await User.findByPk(id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    let { id } = req.params
    try {
        let exists = await userExists(User, id)

        if (!exists) {
           return res.status(404).send(NOT_FOUND)
        }

        await User.update(req.body, { where: { id: id } })
        res.status(200).send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params
    try {
        await User.destroy({ where: { id: id } })
        res.status(200).send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}