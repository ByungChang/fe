/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('files', {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orgName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      size: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
    }, {
        timestamps:true,
        tableName: 'files'
    });
};
  