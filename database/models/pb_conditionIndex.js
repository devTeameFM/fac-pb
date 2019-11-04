
module.exports = (sequelize, DataTypes) => {
  const PB_ConditionIndex = sequelize.define('PB_ConditionIndex', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    LevelTypeName: DataTypes.STRING
  }, {});
  PB_ConditionIndex.associate = function(models) {
    /*
    MS_Member.belongsToMany(models.FE_Scrum, {
      through: 'FE_MembersScrums',
      as: 'scrums',
      foreignKey: 'idMember'
    });
    MS_Member.hasMany(models.PB_Playbook, {
        foreignKey: 'idMember',
        as: 'playbooks',
        onDelete: 'CASCADE',
      });
      */
  };
  return PB_ConditionIndex;
};
