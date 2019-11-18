
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenaltyType = sequelize.define('PB_ServicePenaltyType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    penaltyTypeDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServicePenaltyType.associate = function(models) {
    /*
    PB_ServicePenaltyType.hasMany(models.PB_ServiceSlaPenalty, {
        foreignKey: 'idPenalty',
        onDelete: 'CASCADE',
      });*/
  };
  return PB_ServicePenaltyType;
};
