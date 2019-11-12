
module.exports = (sequelize, DataTypes) => {
  const MS_Member = sequelize.define('MS_Member', {
    id: {
      type : DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    tenant: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  MS_Member.associate = function(models) {
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
  };
  return MS_Member;
};
