
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceKPI = sequelize.define('PB_ServiceKPI', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idKpiScope: {
      type: DataTypes.INTEGER
    },
    kpiName: {
      type: DataTypes.STRING
    },
    idKpiType: {
      type: DataTypes.INTEGER
    },
    isActive: {
      type: DataTypes.BOOLEAN
    },
    idMeasuringProcedures:{
      type: DataTypes.INTEGER
    },
    idMeasuringMethod: {
      type: DataTypes.INTEGER
    },
    calculateProcedure: {
      type: DataTypes.STRING
    },
    idRespType: {
      type: DataTypes.INTEGER
    }
  }, {});
  PB_ServiceKPI.associate = function(models) {
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
  return PB_ServiceKPI;
};
