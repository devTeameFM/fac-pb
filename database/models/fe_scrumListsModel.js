
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
      FE_ScrumsList.hasMany(models.PB_Playbook, {
          foreignKey: 'status',
          as: 'cards',
          onDelete: 'CASCADE',
        });
      /*
      FE_ScrumsList.belongsToMany(models.PB_Playbook, {
        through: 'FE_CardsLists',
        as: 'cards',
        foreignKey: 'idPlaybook'
      });*/
  };
  return FE_ScrumsList;
};
