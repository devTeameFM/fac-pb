
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
    PB_AvailabilityFCI.belongsTo(models.PB_ConditionIndex, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
    PB_AvailabilityFCI.belongsTo(models.PB_ServiceClass, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };
  return PB_AvailabilityFCI;
};
