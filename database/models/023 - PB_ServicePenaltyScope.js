
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenaltyScope = sequelize.define('PB_ServicePenaltyScope', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    penaltyScopeName: {
      type: DataTypes.STRING
    },
    penaltyScopeDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServicePenaltyScope.associate = function(models) {
    PB_ServicePenaltyScope.hasMany(models.PB_ServicePenalty, {
        foreignKey: 'idPenaltyScope',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServicePenaltyScope;
};
