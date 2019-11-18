
module.exports = (sequelize, DataTypes) => {
  const PB_PMProcedure = sequelize.define('PB_PMProcedure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idServiceAsset: {
      type: DataTypes.INTEGER
    },
    activityDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_PMProcedure.associate = function(models) {
    PB_PMProcedure.belongsTo(models.PB_ServiceAssetComponent, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });

    /*PB_PMProcedure.hasMany(models.PB_PMSlaProcedure, {
        foreignKey: 'idPenalty',
        onDelete: 'CASCADE',
      });*/
  };
  return PB_PMProcedure;
};
