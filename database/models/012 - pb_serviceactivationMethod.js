
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceActivationMethod = sequelize.define('PB_ServiceActivationMethod', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    remunerationMethodTypeName: {
      type: DataTypes.STRING
    },
    remunerationMethodDescription: {
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }

  }, {});
  PB_ServiceActivationMethod.associate = function(models) {
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
  return PB_ServiceActivationMethod;
};
