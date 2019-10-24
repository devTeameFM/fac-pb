
module.exports = (sequelize, DataTypes) => {
  const FE_ScrumsList = sequelize.define('FE_ScrumsList', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idScrum: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    imageURL: {
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
  FE_ScrumsList.associate = function(models) {
    FE_ScrumsList.belongsTo(models.FE_Scrum, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
  };
  return FE_ScrumsList;
};
