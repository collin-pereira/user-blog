'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.User,{foreignKey:'userId'})
    Comment.belongsTo(models.Post,{foreignKey:'postId'})
  };
  return Comment;
};