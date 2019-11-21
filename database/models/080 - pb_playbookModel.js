
module.exports = (sequelize, DataTypes) => {
  const PB_Playbook = sequelize.define('PB_Playbook', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idMember: DataTypes.STRING,
    taskId: DataTypes.STRING,
    typeTask:DataTypes.STRING,
    coverImg:DataTypes.STRING,
    name: DataTypes.STRING,
    description:DataTypes.STRING,
    status:DataTypes.STRING
  }, {});
  PB_Playbook.associate = function(models) {

    PB_Playbook.belongsToMany(models.FE_ScrumsList, {
      through: 'FE_CardsList',
      as: 'cards',
      foreignKey: 'idTask'
    });
    /*
    PB_Playbook.hasMany(models.SM_SurveySectionQuestionOption, {
        foreignKey: 'idPlaybook',
        as: 'option',
        onDelete: 'CASCADE',
      });*/
    PB_Playbook.belongsTo(models.PB_PlaybookTaskInfo, {
        foreignKey: 'id',
        as: 'taskInfo',
        onDelete: 'CASCADE',
    });

    PB_Playbook.belongsTo(models.SM_SurveySectionQuestion, {
        foreignKey: 'id',
        as: 'questions',
        onDelete: 'CASCADE',
    });

    PB_Playbook.belongsToMany(models.SM_Survey, {
      through: 'PB_PlaybooksSurveys',
      as: 'surveys',
      foreignKey: 'idTask'
    });
    /*
    PB_Playbook.hasMany(models.SM_SurveyParameter, {
      foreignKey: 'playBookId'
    });*/

  };
  return PB_Playbook;
};
