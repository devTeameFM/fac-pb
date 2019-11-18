
module.exports = (sequelize, DataTypes) => {
  const PB_UnitMeasure = sequelize.define('PB_UnitMeasure', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    unitMeasure: {
      type: DataTypes.STRING
    }
  }, {});
  PB_UnitMeasure.associate = function(models) {
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
  return PB_UnitMeasure;
};
