
module.exports = (sequelize, DataTypes) => {
  const FE_ScrumsSetting = sequelize.define('FE_ScrumsSetting', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idScrum: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    subscribed: {
      type: DataTypes.BOOLEAN
    },
    cardCoverImages: {
      type: DataTypes.BOOLEAN
    },
  }, {});
  FE_ScrumsSetting.associate = function(models) {
    FE_ScrumsSetting.belongsTo(models.FE_Scrum, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
  };
  return FE_ScrumsSetting;
};
