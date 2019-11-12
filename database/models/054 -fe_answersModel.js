
module.exports = (sequelize, DataTypes) => {
  const SM_SurveyAnswer = sequelize.define('SM_SurveyAnswer', {
    playBookId: {
      type: DataTypes.INTEGER
    },
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    value :{
      type: DataTypes.STRING
    }
  }, {});
  SM_SurveyAnswer.associate = function(models) {

  };
  return SM_SurveyAnswer;
};
