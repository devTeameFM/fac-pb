
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceSlaKPI = sequelize.define('PB_ServiceSlaKPI', {
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
    idCondition: {
      type: DataTypes.INTEGER
    },
    idKPI: {
      type: DataTypes.BOOLEAN
    },
    idFrequency:{
      type: DataTypes.INTEGER
    },
    idValueType: {
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.STRING
    },
    idUnitMeasure: {
      type: DataTypes.INTEGER
    }
  }, {});
  PB_ServiceSlaKPI.associate = function(models) {
    PB_ServiceSlaKPI.belongsTo(models.PB_Service, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaKPI.belongsTo(models.PB_UnitMeasure, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaKPI.belongsTo(models.PB_ConditionIndex, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaKPI.belongsTo(models.PB_ServiceSlaKPI, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaKPI.belongsTo(models.PB_ServiceKPI, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    PB_ServiceSlaKPI.belongsTo(models.PB_Frequency, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
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
  return PB_ServiceSlaKPI;
};
