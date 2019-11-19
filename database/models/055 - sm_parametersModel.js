
module.exports = (sequelize, DataTypes) => {
  const SM_SurveyParameter = sequelize.define('SM_SurveyParameter', {
    playBookId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    value :{
      type: DataTypes.STRING
    },
    name :{
      type: DataTypes.STRING
    }
  }, {});
  SM_SurveyParameter.associate = function(models) {

  };
  return SM_SurveyParameter;
};
