
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceClass = sequelize.define('PB_ServiceClass', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  PB_ServiceClass.associate = function(models) {
    PB_ServiceClass.hasMany(models.PB_Service, {
        foreignKey: 'idServiceClass',
        onDelete: 'CASCADE',
      });
    PB_ServiceClass.hasMany(models.PB_AvailabilityFCI, {
      foreignKey: 'idServiceName',
      onDelete: 'CASCADE',
    });
    PB_ServiceClass.hasMany(models.PB_CorrectionTime, {
      foreignKey: 'idServiceName',
      onDelete: 'CASCADE',
    });    
  };
  return PB_ServiceClass;
};
