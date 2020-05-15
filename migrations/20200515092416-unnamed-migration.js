'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'image_link', {
      type: Sequelize.STRING,
      defaultValue: "http://localhost:4000/user/uploads/user.png"
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'image_link')
  }
};
