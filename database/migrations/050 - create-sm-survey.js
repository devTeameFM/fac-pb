'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SM_Surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPlaybook: {
        type: Sequelize.INTEGER
      },      
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      nextStatus: {
        type: Sequelize.STRING
      },
      imageURL: {
        type: Sequelize.STRING
      },
      surveyType: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('SM_Surveys');
  }
};
