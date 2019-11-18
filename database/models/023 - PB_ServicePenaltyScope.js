
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenaltyScope = sequelize.define('PB_ServicePenaltyScope', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    penaltyScopeName: {
      type: DataTypes.STRING
    },
    penaltyScopeDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServicePenaltyScope.associate = function(models) {
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
  return PB_ServicePenaltyScope;
};
