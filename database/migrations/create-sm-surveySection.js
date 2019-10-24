'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SM_SurveySections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSurvey: {
        type: Sequelize.INTEGER,
        references: {
            model: 'SM_Surveys',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      tooltip: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nameI18n: {
        allowNull: true,
        type: Sequelize.STRING
      },
      imageURL: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SM_SurveySections');
  }
};
