/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('displays', {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userGroupId: {
        type: DataTypes.BIGINT(20),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      userYn: {
        type: DataTypes.STRING(1),
        allowNull: false
      },
    }, {
      tableName: 'displays'
    });
  };
  