
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenaltyPerimeter = sequelize.define('PB_ServicePenaltyPerimeter', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    penaltyPerimeterDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServicePenaltyPerimeter.associate = function(models) {
    PB_ServicePenaltyPerimeter.hasMany(models.PB_ServicePenalty, {
        foreignKey: 'idPenaltyPerimeter',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServicePenaltyPerimeter;
};
