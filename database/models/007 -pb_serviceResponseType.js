
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceResponseType = sequelize.define('PB_ServiceResponseType', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    serviceResponseTypeName: {
      type: DataTypes.STRING
    },
    serviceResponseTypeDescription: {
      type: DataTypes.TEXT
    },

  }, {});
  PB_ServiceResponseType.associate = function(models) {
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
  return PB_ServiceResponseType;
};
