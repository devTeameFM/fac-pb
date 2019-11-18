
module.exports = (sequelize, DataTypes) => {
  const PB_PMProcedure = sequelize.define('PB_PMProcedure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idServiceAsset: {
      type: DataTypes.INTEGER
    },
    activityDescription: {
      type: DataTypes.TEXT
    }
  }, {});
  PB_PMProcedure.associate = function(models) {
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
  return PB_PMProcedure;
};
