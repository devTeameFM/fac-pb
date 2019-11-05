module.exports = (sequelize, DataTypes) => {
  const FE_Scrum = sequelize.define('FE_Scrum', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type : DataTypes.STRING,
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
    }  
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
    FE_Scrum.belongsToMany(models.MS_Member, {
      through: 'FE_MembersScrums',
      as: 'members',
      foreignKey: 'idScrum'
    });
  };
  return FE_Scrum;
};
