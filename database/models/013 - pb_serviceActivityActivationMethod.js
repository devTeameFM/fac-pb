
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceActivityActivationMethod = sequelize.define('PB_ServiceActivityActivationMethod', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idActivityType: {
      type: DataTypes.INTEGER
    },
    idRemunerationMethod: {
      type: DataTypes.INTEGER
    },
    activityTypeName: {
      type: DataTypes.STRING
    },
    remunerationMethodTypeName: {
      type: DataTypes.STRING
    }
  }, {});
  PB_ServiceActivityActivationMethod.associate = function(models) {
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
  return PB_ServiceActivityActivationMethod;
};
