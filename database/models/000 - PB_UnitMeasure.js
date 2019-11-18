
module.exports = (sequelize, DataTypes) => {
  const PB_UnitMeasure = sequelize.define('PB_UnitMeasure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    unitMeasure: {
      type: DataTypes.STRING
    }
  }, {});
  PB_UnitMeasure.associate = function(models) {
    PB_UnitMeasure.hasMany(models.PB_ServiceSlaKPI, {
        foreignKey: 'idSLA',
        onDelete: 'CASCADE',
      });
    PB_UnitMeasure.hasMany(models.PB_ServiceSlaPenalty, {
        foreignKey: 'idUnitMeasure',
        onDelete: 'CASCADE',
      });
  };
  return PB_UnitMeasure;
};
