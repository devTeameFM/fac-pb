
module.exports = (sequelize, DataTypes) => {
  const SM_Survey = sequelize.define('SM_Survey', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idPlaybook: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    nextStatus: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    surveyType: DataTypes.STRING
  }, {});
  SM_Survey.associate = function(models) {
    SM_Survey.hasMany(models.SM_SurveySection, {
      foreignKey: 'idSurvey',
      as: 'sections',
      onDelete: 'CASCADE',
    });
    SM_Survey.belongsToMany(models.PB_Playbook, {
      through: 'PB_PlaybooksSurveys',
      as: 'playbooks',
      foreignKey: 'idSurvey'
    });
    /*
    SM_Survey.belongsTo(models.PB_Playbook, {
        foreignKey: 'typeTask',
        as: 'surveys',
        onDelete: 'CASCADE',
    });*/

  };
  return SM_Survey;
};
