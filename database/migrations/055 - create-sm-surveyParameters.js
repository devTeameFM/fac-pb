'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SM_SurveyParameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playBookId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      questionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value :{
        type: Sequelize.STRING
      },
      name :{
        type: Sequelize.STRING
      },
      updated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SM_SurveyParameters');
  }
};
