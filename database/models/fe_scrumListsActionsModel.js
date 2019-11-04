
module.exports = (sequelize, DataTypes) => {
  const FE_ScrumsListsAction = sequelize.define('FE_ScrumsListsAction', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idList: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    }
  }, {});
  FE_ScrumsListsAction.associate = function(models) {
    FE_ScrumsListsAction.belongsTo(models.FE_ScrumsList, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
  };
  return FE_ScrumsListsAction;
};
