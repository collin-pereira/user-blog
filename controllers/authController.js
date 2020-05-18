const User = require('../models').User

const login = async (req, res) => {
    try {
        let user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } })
        user.dataValues.token = user.generateAuthToken()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    login
}