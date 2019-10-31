/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('board_files', {
      boardId: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      fileId: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
        timestamps:true,
        tableName: 'board_files'
    });
};
  