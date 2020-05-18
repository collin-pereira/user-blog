'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'userId', {
      type: Sequelize.UUID,
      allowNull:false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('userId')
  }
};
