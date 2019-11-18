
module.exports = (sequelize, DataTypes) => {
  const PB_Frequency = sequelize.define('PB_Frequency', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    frequency: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.STRING
    }
  }, {});
  PB_Frequency.associate = function(models) {
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
  return PB_Frequency;
};
