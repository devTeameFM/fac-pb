
module.exports = (sequelize, DataTypes) => {
  const SM_SurveySectionQuestion = sequelize.define('SM_SurveySectionQuestion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idPlaybook: DataTypes.INTEGER,
    idSection: DataTypes.INTEGER,
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    tooltip: DataTypes.STRING,
    type: DataTypes.STRING,
    icon: DataTypes.STRING,
    tableName : DataTypes.STRING,
    tableHeader: DataTypes.STRING,
    tableRows: DataTypes.TEXT,
    updated: DataTypes.BOOLEAN,
    required: DataTypes.TEXT,
    flow: DataTypes.STRING,
    tableInput: DataTypes.STRING,
    valueInput: DataTypes.STRING,
    isParameter:DataTypes.BOOLEAN
  }, {});
  SM_SurveySectionQuestion.associate = function(models) {
    SM_SurveySectionQuestion.hasMany(models.SM_SurveySectionQuestionOption, {
        foreignKey: 'idQuestion',
        as: 'options',
        onDelete: 'CASCADE',
      });

    SM_SurveySectionQuestion.belongsTo(models.SM_SurveySection, {
        foreignKey: 'id',
        as: 'sections',
        onDelete: 'CASCADE',
    });

    SM_SurveySectionQuestion.hasMany(models.SM_SurveyAnswer, {
        foreignKey: 'questionId',
        as: 'answers',
        onDelete: 'CASCADE',
      });
    SM_SurveySectionQuestion.hasMany(models.SM_SurveyParameter, {
        foreignKey: 'questionId',
        as: 'parameters',
        onDelete: 'CASCADE',
      });
      
  };
  return SM_SurveySectionQuestion;
};
