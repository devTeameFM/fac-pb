'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_PMSlaProcedures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idservice: {
        type: Sequelize.INTEGER
      },
      idPMServiceAsset: {
        type: Sequelize.INTEGER
      },
      activitydescription: {
          type: Sequelize.TEXT
      },
      idSLA: {
        type: Sequelize.INTEGER
      },
      idFrequency: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('PB_PMSlaProcedures');
  }
};
