
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenalty = sequelize.define('PB_ServicePenalty', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idPenaltyScope: {
      type: DataTypes.INTEGER
    },
    penaltyName: {
      type: DataTypes.STRING
    },
    penaltyDescription: {
      type: DataTypes.STRING
    },
    indicatoreArea: {
      type: DataTypes.STRING
    },
    idPenaltyPerimeter:{
      type: DataTypes.INTEGER
    },
    idPenaltyType: {
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  PB_ServicePenalty.associate = function(models) {
    PB_ServicePenalty.belongsTo(models.PB_ServicePenaltyScope, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServicePenalty.belongsTo(models.PB_ServicePenaltyPerimeter, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServicePenalty.hasMany(models.PB_ServiceSlaPenalty, {
        foreignKey: 'idPenalty',
        onDelete: 'CASCADE',
      });

  };
  return PB_ServicePenalty;
};
