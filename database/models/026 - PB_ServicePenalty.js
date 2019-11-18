
module.exports = (sequelize, DataTypes) => {
  const PB_ServicePenalty = sequelize.define('PB_ServicePenalty', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idPenaltyScope: {
      type: DataTypes.INTEGER
    },
    penaltyName: {
      type: DataTypes.STRING
    },
    penaltyDescription: {
      type: DataTypes.STRING
    },
    indicatoreArea: {
      type: DataTypes.STRING
    },
    idPenaltyPerimeter:{
      type: DataTypes.INTEGER
    },
    idPenaltyType: {
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN
    }
  }, {});
  PB_ServicePenalty.associate = function(models) {
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
  return PB_ServicePenalty;
};
