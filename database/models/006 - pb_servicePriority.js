
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePriority = sequelize.define('PB_ServicePriority', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    servicePriorityName: {
      type: DataTypes.STRING
    },
    servicePriorityDescription: {
      type: DataTypes.TEXT
    },
  }, {});
  PB_ServicePriority.associate = function(models) {
    PB_ServicePriority.hasMany(models.PB_CorrectionTime, {
      foreignKey: 'idPriorityName',
      onDelete: 'CASCADE',
    });
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
  return PB_ServicePriority;
};
