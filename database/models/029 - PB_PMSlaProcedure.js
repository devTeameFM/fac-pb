
module.exports = (sequelize, DataTypes) => {
  const PB_PMSlaProcedure = sequelize.define('PB_PMSlaProcedure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idPMServiceAsset: {
      type: DataTypes.INTEGER
    },
    idSLA: {
      type: DataTypes.INTEGER
    },
    idFrequency: {
      type: DataTypes.TEXT
    },
  }, {});
  PB_PMSlaProcedure.associate = function(models) {
    PB_PMSlaProcedure.belongsTo(models.PB_ServiceLevelAgreement, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_PMSlaProcedure.belongsTo(models.PB_Frequency, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });

  };
  return PB_PMSlaProcedure;
};
