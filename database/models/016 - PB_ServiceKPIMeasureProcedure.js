
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIMeasureProcedure = sequelize.define('PB_ServiceKPIMeasureProcedure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    measureProcedureDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIMeasureProcedure.associate = function(models) {
    PB_ServiceKPIMeasureProcedure.hasMany(models.PB_ServiceKPI, {
        foreignKey: 'idMeasuringProcedures',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServiceKPIMeasureProcedure;
};
