
module.exports = (sequelize, DataTypes) => {
  const PB_ServiceAssetComponent = sequelize.define('PB_ServiceAssetComponent', {
    id: {
      type : DataTypes.INTEGER,
      primaryKey: true
    },
    idService: {
      type: DataTypes.INTEGER
    },
    assetComponentType: {
      type: DataTypes.STRING
    },
    serviceName: {
      type: DataTypes.STRING
    }
  }, {});
  PB_ServiceAssetComponent.associate = function(models) {
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
  return PB_ServiceAssetComponent;
};
