'use strict';

var passwordHash = require('password-hash');

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
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password =passwordHash.generate(user.password)
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
