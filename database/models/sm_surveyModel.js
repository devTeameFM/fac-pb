
module.exports = (sequelize, DataTypes) => {
  const SM_Survey = sequelize.define('SM_Survey', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    nextStatus: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {});
  SM_Survey.associate = function(models) {
    SM_Survey.hasMany(models.SM_SurveySection, {
      foreignKey: 'idSurvey',
      as: 'sections',
      onDelete: 'CASCADE',
    });
  };
  return SM_Survey;
};
