
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceDuration = sequelize.define('PB_ServiceDuration', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  PB_ServiceDuration.associate = function(models) {

  };
  return PB_ServiceDuration;
};
