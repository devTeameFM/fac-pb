
module.exports = (sequelize, DataTypes) => {
  const PB_ConditionIndex = sequelize.define('PB_ConditionIndex', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    levelTypeName: DataTypes.STRING
  }, {});
  PB_ConditionIndex.associate = function(models) {
    PB_ConditionIndex.hasMany(models.PB_ServiceSlaKPI, {
        foreignKey: 'idCondition',
        onDelete: 'CASCADE',
      });
    PB_ConditionIndex.hasMany(models.PB_AvailabilityFCI, {
        foreignKey: 'idFci',
        onDelete: 'CASCADE',
      });
  };
  return PB_ConditionIndex;
};
