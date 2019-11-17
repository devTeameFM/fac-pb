
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
