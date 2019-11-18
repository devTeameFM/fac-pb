
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIValueType = sequelize.define('PB_ServiceKPIValueType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    valueTypeName: {
      type: DataTypes.STRING
    },
    valueMeasureUnit: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIValueType.associate = function(models) {
    PB_ServiceKPIValueType.hasMany(models.PB_ServiceSlaKPI, {
        foreignKey: 'idValueType',
        onDelete: 'CASCADE',
      });
    PB_ServiceKPIValueType.hasMany(models.PB_ServiceSlaPenalty, {
        foreignKey: 'idValueType',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServiceKPIValueType;
};
