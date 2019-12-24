
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
    order: {
      type: DataTypes.INTEGER
    }
  }, {});
  PB_ServiceRequirement.associate = function(models) {
    PB_ServiceRequirement.belongsTo(models.PB_Service, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
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
  return PB_ServiceRequirement;
};
