
module.exports = (sequelize, DataTypes) => {
  const SM_SurveySectionQuestionOption = sequelize.define('SM_SurveySectionQuestionOption', {
    idQuestion: DataTypes.INTEGER,
    name: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {});
  SM_SurveySectionQuestionOption.associate = function(models) {
    SM_SurveySectionQuestionOption.belongsTo(models.SM_SurveySectionQuestion, {
        foreignKey: 'id',
        as: 'options',
        onDelete: 'CASCADE',
    });
  };
  return SM_SurveySectionQuestionOption;
};
