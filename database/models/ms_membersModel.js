
module.exports = (sequelize, DataTypes) => {
  const MS_Member = sequelize.define('MS_Member', {
    id: {
      type : DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    tenant: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  MS_Member.associate = function(models) {
    MS_Member.hasMany(models.FE_Scrum, {
          foreignKey: 'id',
        //  as: 'members',
          onDelete: 'CASCADE',
        });
    /*
    MS_Member.belongsTo(models.FE_Scrum, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });*/
  };
  return MS_Member;
};
