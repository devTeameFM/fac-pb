
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceSlaPenalty = sequelize.define('PB_ServiceSlaPenalty', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idService: {
      type: DataTypes.INTEGER
    },
    idSLA: {
      type: DataTypes.INTEGER
    },
    idPenalty: {
      type: DataTypes.INTEGER
    },
    idValueType: {
      type: DataTypes.INTEGER
    },
    value:{
      type: DataTypes.TEXT
    },
    idUnitMeasure: {
      type: DataTypes.INTEGER
    }
  }, {});
  PB_ServiceSlaPenalty.associate = function(models) {
    PB_ServiceSlaPenalty.belongsTo(models.PB_Service, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaPenalty.belongsTo(models.PB_UnitMeasure, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaPenalty.belongsTo(models.PB_ServiceKPIValueType, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaPenalty.belongsTo(models.PB_ServiceKPI, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaPenalty.belongsTo(models.PB_ServicePenaltyType, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaPenalty.belongsTo(models.PB_ServicePenalty, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaPenalty.belongsTo(models.PB_ServiceLevelAgreement, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
  };
  return PB_ServiceSlaPenalty;
};
