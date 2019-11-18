
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
  };
  return PB_ServiceClass;
};
