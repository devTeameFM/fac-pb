
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceSlaResponseType = sequelize.define('PB_ServiceSlaResponseType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idService: {
      type: DataTypes.INTEGER
    },
    idServiceResponseType: {
      type: DataTypes.INTEGER
    },
    idServicePriority: {
      type: DataTypes.INTEGER
    },
    idServiceLevelAgreement: {
      type: DataTypes.INTEGER
    },
    target: {
      type: DataTypes.STRING
    },
    serviceName: {
      type: DataTypes.STRING
    },
    serviceResponseTypeName: {
      type: DataTypes.STRING
    },
    servicePriorityName: {
      type: DataTypes.STRING
    },
    serviceLevelAgreementName: {
      type: DataTypes.STRING
    }

  }, {});
  PB_ServiceSlaResponseType.associate = function(models) {
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
  return PB_ServiceSlaResponseType;
};
