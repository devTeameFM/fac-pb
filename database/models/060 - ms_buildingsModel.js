
module.exports = (sequelize, DataTypes) => {
  const MS_Building = sequelize.define('MS_Building', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idMember: DataTypes.STRING,
    name: DataTypes.STRING,
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    },

  }, {});
  MS_Building.associate = function(models) {
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
  return MS_Building;
};
