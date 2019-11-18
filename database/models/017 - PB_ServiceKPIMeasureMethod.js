
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIMeasureMethod = sequelize.define('PB_ServiceKPIMeasureMethod', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    measureMethodDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIMeasureMethod.associate = function(models) {
    PB_ServiceKPIMeasureMethod.hasMany(models.PB_ServiceKPI, {
        foreignKey: 'idMeasuringMethod',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServiceKPIMeasureMethod;
};
