
module.exports = (sequelize, DataTypes) => {
  const PB_Playbook = sequelize.define('PB_Playbook', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idMembers: DataTypes.INTEGER,
  }, {});
  PB_Playbook.associate = function(models) {

  };
  return PB_Playbook;
};
