'use strict';

var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING(20),
    lastName: DataTypes.STRING(20),
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    image_link: {
      type: DataTypes.STRING,
      defaultValue: "http://localhost:4000/user/uploads/user.png"
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = passwordHash.generate(user.password)
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Post, { foreignKey: 'userId' })
  };

  User.prototype.generateAuthToken= function() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_KEY)
    return token
  }

  User.findByCredentials = async (email, password) => {
    try {
      let user = await User.findOne({ where: { email: email }, raw: true })
      if (passwordHash.verify(password, user.password)) {
        delete user.password
        delete user.image_link
        return user
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  return User;
};
