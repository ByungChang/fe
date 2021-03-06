module.exports = function(sequelize, DataTypes) {
    return sequelize.define('devices', {
      id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      firmVersion: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      isOn: {
        type: DataTypes.STRING(1),
        allowNull: false
      },
      
    }, {
      timestamps:true,
      tableName: 'devices'
    });
  };
  