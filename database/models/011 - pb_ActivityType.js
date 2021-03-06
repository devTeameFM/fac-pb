
module.exports = (sequelize, DataTypes) => {
  const PB_ActivityType = sequelize.define('PB_ActivityType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    activityTypeName: {
      type: DataTypes.STRING
    },
    activityTypeDescription: {
      type: DataTypes.TEXT
    },
  },
    {});
  PB_ActivityType.associate = function(models) {
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
  return PB_ActivityType;
};
