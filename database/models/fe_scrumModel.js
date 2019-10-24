
module.exports = (sequelize, DataTypes) => {
  const FE_Scrum = sequelize.define('FE_Scrum', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    imageURL: {
      type: DataTypes.STRING
    },
    uri: {
      type: DataTypes.STRING
    },
  }, {});
  FE_Scrum.associate = function(models) {
    FE_Scrum.hasMany(models.FE_ScrumsSetting, {
        foreignKey: 'idScrum',
        as: 'settings',
        onDelete: 'CASCADE',
      });
    FE_Scrum.hasMany(models.FE_ScrumsList, {
          foreignKey: 'idScrum',
          as: 'lists',
          onDelete: 'CASCADE',
        });
    FE_Scrum.belongsTo(models.MS_Member, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    /*
    FE_Scrum.hasMany(models.MS_Member, {
          foreignKey: 'idScrum',
          as: 'members',
          onDelete: 'CASCADE',
        });*/
  };
  return FE_Scrum;
};
