
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceSlaPenalty = sequelize.define('PB_ServiceSlaPenalty', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idService: {
      type: DataTypes.INTEGER
    },
    idSLA: {
      type: DataTypes.INTEGER
    },
    idPenalty: {
      type: DataTypes.INTEGER
    },
    idValueType: {
      type: DataTypes.INTEGER
    },
    value:{
      type: DataTypes.INTEGER
    },
    idUnitMeasure: {
      type: DataTypes.INTEGER
    }
  }, {});
  PB_ServiceSlaPenalty.associate = function(models) {
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
  return PB_ServiceSlaPenalty;
};
