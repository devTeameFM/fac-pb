
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIMeasureMethod = sequelize.define('PB_ServiceKPIMeasureMethod', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    measureMethodDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIMeasureMethod.associate = function(models) {
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
  return PB_ServiceKPIMeasureMethod;
};
