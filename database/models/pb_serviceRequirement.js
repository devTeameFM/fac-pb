
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceRequirement = sequelize.define('PB_ServiceRequirement', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idService: {
      type: DataTypes.INTEGER
    },
    serviceRequirementDescription: {
      type: DataTypes.TEXT
    },
    serviceName: {
      type: DataTypes.STRING
    },

  }, {});
  PB_ServiceRequirement.associate = function(models) {
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
  return PB_ServiceRequirement;
};
