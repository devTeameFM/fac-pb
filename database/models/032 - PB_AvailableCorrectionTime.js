
module.exports = (sequelize, DataTypes) => {
  const PB_AvailableCorrectionTime = sequelize.define('PB_AvailableCorrectionTime', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      idServiceName: {
        type: DataTypes.INTEGER
      },
      idFci: {
        type: DataTypes.INTEGER
      },
      idSLA: {
        type: DataTypes.INTEGER
      },
      value: {
        type: DataTypes.TEXT
      },
      typeName: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
  }, {});
  PB_AvailableCorrectionTime.associate = function(models) {
    

  };
  return PB_AvailableCorrectionTime;
};
