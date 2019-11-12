
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceLevelAgreement = sequelize.define('PB_ServiceLevelAgreement', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    serviceLevelAgreementName: {
      type: DataTypes.STRING
    },
    serviceLevelAgreementDescription: {
      type: DataTypes.TEXT
    },

  }, {});
  PB_ServiceLevelAgreement.associate = function(models) {
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
  return PB_ServiceLevelAgreement;
};
