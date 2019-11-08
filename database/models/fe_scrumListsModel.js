
module.exports = (sequelize, DataTypes) => {
  const FE_ScrumsList = sequelize.define('FE_ScrumsList', {
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
    }
  }, {});
  FE_ScrumsList.associate = function(models) {
    FE_ScrumsList.belongsTo(models.FE_Scrum, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
      /*
      FE_ScrumsList.hasMany(models.PB_Playbook, {
          foreignKey: 'status',
          as: 'cards',
          onDelete: 'CASCADE',
        });*/
      FE_ScrumsList.hasMany(models.FE_ScrumsListsAction, {
          foreignKey: 'idList',
          as: 'actions',
          onDelete: 'CASCADE',
        });
        FE_ScrumsList.belongsToMany(models.PB_Playbook, {
          through: 'FE_CardsList',
          as: 'cards',
          foreignKey: 'idList'
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
