
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenaltyType = sequelize.define('PB_ServicePenaltyType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    penaltyTypeDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServicePenaltyType.associate = function(models) {
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
  return PB_ServicePenaltyType;
};
