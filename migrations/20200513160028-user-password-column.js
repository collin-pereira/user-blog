'use strict';

var passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'password',
      {
        type: Sequelize.STRING,
        defaultValue: passwordHash.generate("password"),
        allowNull: false,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'password')
  }
};