
module.exports = (sequelize, DataTypes) => {
  const SM_SurveySection = sequelize.define('SM_SurveySection', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idPlaybook: DataTypes.INTEGER,
    idSurvey: DataTypes.INTEGER,
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    tooltip: DataTypes.STRING
  }, {});
  SM_SurveySection.associate = function(models) {
    SM_SurveySection.hasMany(models.SM_SurveySectionQuestion, {
        foreignKey: 'idSection',
        as: 'questions',
        onDelete: 'CASCADE',
      });
    
    SM_SurveySection.belongsTo(models.SM_Survey, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });

  };
  return SM_SurveySection;
};
