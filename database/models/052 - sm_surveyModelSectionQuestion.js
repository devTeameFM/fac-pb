
module.exports = (sequelize, DataTypes) => {
  const SM_SurveySectionQuestion = sequelize.define('SM_SurveySectionQuestion', {
    idSection: DataTypes.INTEGER,
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    tooltip: DataTypes.STRING,
    type: DataTypes.STRING,
    icon: DataTypes.STRING,
    required: DataTypes.STRING,
    flow: DataTypes.STRING,
    tableInput: DataTypes.STRING,
    valueInput: DataTypes.STRING,
    isParameter:DataTypes.BOOLEAN
  }, {});
  SM_SurveySectionQuestion.associate = function(models) {
    SM_SurveySectionQuestion.belongsTo(models.SM_SurveySection, {
        foreignKey: 'id',
        //as: 'question',
        onDelete: 'CASCADE',
    });
    SM_SurveySectionQuestion.hasMany(models.SM_SurveySectionQuestionOption, {
        foreignKey: 'idQuestion',
        as: 'options',
        onDelete: 'CASCADE',
      });
  };
  return SM_SurveySectionQuestion;
};
