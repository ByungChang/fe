/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('companys', {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    }, {
      timestamps:true,
      tableName: 'companys'
    });
};
  