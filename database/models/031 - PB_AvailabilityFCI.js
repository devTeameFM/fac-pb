
module.exports = (sequelize, DataTypes) => {
  const PB_AvailabilityFCI = sequelize.define('PB_AvailabilityFCI', {
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
      type: {
        type: DataTypes.TEXT
      },
      estimated: {
        type: DataTypes.TEXT
      },
      definition: {
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
  PB_AvailabilityFCI.associate = function(models) {
    

  };
  return PB_AvailabilityFCI;
};
