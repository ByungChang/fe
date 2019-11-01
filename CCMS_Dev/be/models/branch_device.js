module.exports = function(sequelize, DataTypes) {
    return sequelize.define('branch_devices', {
      deviceId: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      branchId: {
        type: DataTypes.BIGINT(20),
        allowNull: false
      },
      descript: {
        type: DataTypes.STRING(1),
        allowNull: false
      },
    }, {
      timestamps:true,
      tableName: 'branch_devices'
    });
  };
  