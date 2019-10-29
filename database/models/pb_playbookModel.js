
module.exports = (sequelize, DataTypes) => {
  const PB_Playbook = sequelize.define('PB_Playbook', {
    idMember: DataTypes.STRING,
    typeTask:DataTypes.STRING,
    name: DataTypes.STRING,
    description:DataTypes.STRING,
    status:DataTypes.STRING
  }, {});
  PB_Playbook.associate = function(models) {
    /*
    PB_Playbook.hasMany(models.SM_Survey, {
        foreignKey: 'surveyType',
        as: 'surveys',
        onDelete: 'CASCADE',
      });*/
    PB_Playbook.belongsTo(models.MS_Member, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
    });

    PB_Playbook.belongsToMany(models.SM_Survey, {
      through: 'PB_PlaybooksSurveys',
      as: 'surveys',
      foreignKey: 'idPlaybook'
    });

  };
  return PB_Playbook;
};
