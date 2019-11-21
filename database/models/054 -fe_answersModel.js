
module.exports = (sequelize, DataTypes) => {
  const SM_SurveyAnswer = sequelize.define('SM_SurveyAnswer', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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

    SM_SurveyAnswer.belongsTo(models.SM_SurveySectionQuestion, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
    });
    
  };
  return SM_SurveyAnswer;
};
