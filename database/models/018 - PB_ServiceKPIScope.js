
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIScope = sequelize.define('PB_ServiceKPIScope', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    kpiScopeName: {
      type: DataTypes.STRING
    },
    kpiScopeDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIScope.associate = function(models) {
    PB_ServiceKPIScope.hasMany(models.PB_ServiceKPI, {
        foreignKey: 'idKpiScope',
        onDelete: 'CASCADE',
      });
  };
  return PB_ServiceKPIScope;
};
