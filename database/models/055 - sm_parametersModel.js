
module.exports = (sequelize, DataTypes) => {
  const SM_SurveyParameter = sequelize.define('SM_SurveyParameter', {
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
