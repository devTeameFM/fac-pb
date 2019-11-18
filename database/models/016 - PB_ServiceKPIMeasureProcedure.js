
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIMeasureProcedure = sequelize.define('PB_ServiceKPIMeasureProcedure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    measureProcedureDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIMeasureProcedure.associate = function(models) {
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
  return PB_ServiceKPIMeasureProcedure;
};
