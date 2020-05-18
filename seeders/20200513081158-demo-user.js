'use strict';

const fakeSeeder = require('fake-seeder')
const uuid = require('uuid')
var passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users = fakeSeeder.generateCard(10)
      .map(user => {
        user.id=uuid.v4()
        user.password = passwordHash.generate('secret_password')
        user.createdAt= new Date()
        user.updatedAt= new Date()
        return user
      })
    return queryInterface.bulkInsert('Users', users , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};