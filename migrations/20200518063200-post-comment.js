'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments', 'postId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      },
      onDelete: 'CASCADE'
    })
    .then(()=>{
      return queryInterface.addColumn('Comments', 'userId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments','postId')
    .then(()=>{
      return queryInterface.removeColumn('Comments','userId')
    })
  }
};
