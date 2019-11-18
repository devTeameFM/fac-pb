
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

  }, {});
  PB_ServiceSlaResponseType.associate = function(models) {
    PB_ServiceSlaResponseType.belongsTo(models.PB_Service, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaResponseType.belongsTo(models.PB_ServiceResponseType, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaResponseType.belongsTo(models.PB_ServiceLevelAgreement, {
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
  return PB_ServiceSlaResponseType;
};
