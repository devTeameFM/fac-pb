
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceExtensionRule = sequelize.define('PB_ServiceExtensionRule', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {});
  PB_ServiceExtensionRule.associate = function(models) {
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
  return PB_ServiceExtensionRule;
};
