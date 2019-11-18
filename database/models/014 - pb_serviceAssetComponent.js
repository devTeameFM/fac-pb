
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceAssetComponent = sequelize.define('PB_ServiceAssetComponent', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idService: {
      type: DataTypes.INTEGER
    },
    assetComponentType: {
      type: DataTypes.STRING
    },
    serviceName: {
      type: DataTypes.STRING
    }
  }, {});
  PB_ServiceAssetComponent.associate = function(models) {
    PB_ServiceAssetComponent.belongsTo(models.PB_Service, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceAssetComponent.hasMany(models.PB_PMProcedure, {
        foreignKey: 'idServiceAsset',
        onDelete: 'CASCADE',
      });

  };
  return PB_ServiceAssetComponent;
};
