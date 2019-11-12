
module.exports = (sequelize, DataTypes) => {
  const FE_CardsList = sequelize.define('FE_CardsList', {
    idTask: {
      allowNull: false,
      type: DataTypes.STRING
    },
    idList: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {});
  FE_CardsList.associate = function(models) {

  };
  return FE_CardsList;
};
