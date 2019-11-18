
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPI = sequelize.define('PB_ServiceKPI', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idKpiScope: {
      type: DataTypes.INTEGER
    },
    kpiName: {
      type: DataTypes.STRING
    },
    idKpiType: {
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN
    },
    idMeasuringProcedures:{
      type: DataTypes.INTEGER
    },
    idMeasuringMethod: {
      type: DataTypes.INTEGER
    },
    calculateProcedure: {
      type: DataTypes.STRING
    },
    idRespType: {
      type: DataTypes.INTEGER
    }
  }, {});
  PB_ServiceKPI.associate = function(models) {
    PB_ServiceKPI.belongsTo(models.PB_ServiceKPIMeasureProcedure, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceKPI.belongsTo(models.PB_ServiceKPIMeasureMethod, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceKPI.belongsTo(models.PB_ServiceKPIScope, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceKPI.belongsTo(models.PB_ServiceResponseType, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceKPI.hasMany(models.PB_ServiceSlaPenalty, {
        foreignKey: 'idPenalty',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServiceKPI;
};
