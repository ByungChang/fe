/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('branchs', {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      expiredDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      companyId: {
        type: DataTypes.BIGINT(20),
        allowNull: false
      },
      busNumber: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      isMain: {
        type: DataTypes.STRING(1),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      tel: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
    }, {
      timestamps:true,
      tableName: 'branchs'
    });
};
  