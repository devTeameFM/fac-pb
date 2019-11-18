
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceResponseType = sequelize.define('PB_ServiceResponseType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    serviceResponseTypeName: {
      type: DataTypes.STRING
    },
    serviceResponseTypeDescription: {
      type: DataTypes.TEXT
    },

  }, {});
  PB_ServiceResponseType.associate = function(models) {
    PB_ServiceResponseType.hasMany(models.PB_ServiceSlaResponseType, {
        foreignKey: 'idServiceResponseType',
        onDelete: 'CASCADE',
      });
    PB_ServiceResponseType.hasMany(models.PB_ServiceKPI, {
        foreignKey: 'idRespType',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServiceResponseType;
};
