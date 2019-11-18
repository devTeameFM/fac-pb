
module.exports = (sequelize, DataTypes) => {
  const PB_Frequency = sequelize.define('PB_Frequency', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    frequency: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.STRING
    }
  }, {});
  PB_Frequency.associate = function(models) {
    PB_Frequency.hasMany(models.PB_ServiceSlaKPI, {
        foreignKey: 'idFrequency',
        onDelete: 'CASCADE',
      });
  PB_Frequency.hasMany(models.PB_PMSlaProcedure, {
      foreignKey: 'idFrequency',
      onDelete: 'CASCADE',
    });
  };
  return PB_Frequency;
};
