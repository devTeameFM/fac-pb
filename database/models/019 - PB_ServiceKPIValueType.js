
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPIScope = sequelize.define('PB_ServiceKPIScope', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    valueTypeName: {
      type: DataTypes.STRING
    },
    valueMeasureUnit: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_ServiceKPIScope.associate = function(models) {
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
  return PB_ServiceKPIScope;
};
