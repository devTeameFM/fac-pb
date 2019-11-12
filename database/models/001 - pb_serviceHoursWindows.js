
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceHoursWindow = sequelize.define('PB_ServiceHoursWindow', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {});
  PB_ServiceHoursWindow.associate = function(models) {
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
  return PB_ServiceHoursWindow;
};
