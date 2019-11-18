
module.exports = (sequelize, DataTypes) => {
  const PB_Service = sequelize.define('PB_Service', {
    idServiceClass: {
      type: DataTypes.INTEGER
    },
    serviceName: {
      type: DataTypes.STRING
    },
    serviceDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_Service.associate = function(models) {
    PB_Service.belongsTo(models.PB_ServiceClass, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_Service.hasMany(models.PB_ServiceSlaResponseType, {
        foreignKey: 'idService',
        onDelete: 'CASCADE',
      });
    PB_Service.hasMany(models.PB_ServiceRequirement, {
        foreignKey: 'idService',
        onDelete: 'CASCADE',
      });
    PB_Service.hasMany(models.PB_ServiceAssetComponent, {
        foreignKey: 'idService',
        onDelete: 'CASCADE',
      });
    PB_Service.hasMany(models.PB_ServiceSlaKPI, {
        foreignKey: 'idService',
        onDelete: 'CASCADE',
      });
    PB_Service.hasMany(models.PB_ServiceSlaPenalty, {
        foreignKey: 'idService',
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
  return PB_Service;
};
