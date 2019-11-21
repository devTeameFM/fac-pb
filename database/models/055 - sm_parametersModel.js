
module.exports = (sequelize, DataTypes) => {
  const SM_SurveyParameter = sequelize.define('SM_SurveyParameter', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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

    SM_SurveyParameter.belongsTo(models.SM_SurveySectionQuestion, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
    });
    SM_SurveyParameter.belongsTo(models.PB_Playbook, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
    });
    
  };
  return SM_SurveyParameter;
};
