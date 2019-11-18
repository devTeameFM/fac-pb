
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenaltyPerimeter = sequelize.define('PB_ServicePenaltyPerimeter', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    penaltyPerimeterDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServicePenaltyPerimeter.associate = function(models) {
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
  return PB_ServicePenaltyPerimeter;
};
