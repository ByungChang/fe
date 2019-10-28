/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('board_comments', {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      boardId:{
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.BIGINT(20),
        allowNull: false
      },
    }, {
      timestamps:true,
      tableName: 'board_comments'
    });
  };
  