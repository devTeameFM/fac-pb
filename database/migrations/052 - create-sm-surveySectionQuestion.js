'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SM_SurveySectionQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSection: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      tooltip: {
        type: Sequelize.STRING
      },
      nameI98n: {
        type: Sequelize.STRING
      },
      tooltipI18n: {
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      tableHeader: {
        type: Sequelize.TEXT
      },
      tableRows: {
        type: Sequelize.TEXT
      },
      updated : {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
	    required: {
        type: Sequelize.BOOLEAN
      },
      flow: {
        type: Sequelize.BOOLEAN
      },
      tableInput: {
        type: Sequelize.STRING
      },
      valueInput: {
        type: Sequelize.STRING
      },
      isParameter: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('SM_SurveySectionQuestions');
  }
};
