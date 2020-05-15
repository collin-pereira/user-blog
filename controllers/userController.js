const User = require('../models').User
const Busboy = require('busboy')
const helper = require('../helpers')
const fs = require('fs')

const NOT_FOUND = { message: 'user not found' }
const SUCCESS = { message: "success" }

/**
 * create user
 * delete the password form the object
 * if unique email error send 409 status
 */
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body, { raw: true })
        delete user.dataValues.password
        res.status(201).send(user)
    } catch (error) {
        let status = error.name === "SequelizeUniqueConstraintError" ? 409 : 500
        res.status(status).send(error.errors)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({ attributes: { exclude: ['password'] } })
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUser = async (req, res) => {
    let { id } = req.params
    try {
        let exists = await helper.resourceExists(User, id)
        if (!exists) return res.status(404).send(NOT_FOUND)

        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } })
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    let { id } = req.params
    try {
        let exists = await helper.resourceExists(User, id)
        if (!exists) return res.status(404).send(NOT_FOUND)

        await User.update(req.body, { where: { id: id } })
        res.status(200).send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params
    try {
        let exists = await helper.resourceExists(User, id)
        if (!exists) return res.status(404).send(NOT_FOUND)

        await User.destroy({ where: { id: id } })
        res.status(200).send(SUCCESS)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateProfileImage = async (req, res) => {
    let { id } = req.params
    try {
        let exists = await helper.resourceExists(User, id)
        if (!exists) return res.status(404).send(NOT_FOUND)
    } catch (error) {
        res.status(500).send(error)
    }
    const busboy = new Busboy({ headers: req.headers, limits: { fileSize: 50000, files: 1 } })
    var imageName, imagePath

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        imageName = `${Date.parse(new Date())}_${filename}`
        imagePath = `${__BASEDIR}${process.env.STATIC}/${imageName}`
        file.on('limit', () => {
            res.status(413).send({ message: "file size exceeded, max: 5MB" })
        })
        file.pipe(fs.createWriteStream(imagePath));
    })

    busboy.on('finish', async() => {
        try {
            await User.update({image_link:"http://localhost:4000/user/uploads/"+imageName},{ where: { id: id } })
            res.status(200).send(SUCCESS)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    req.pipe(busboy)
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateProfileImage
}