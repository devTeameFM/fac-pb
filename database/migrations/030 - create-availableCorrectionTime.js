'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_AvailableCorrectionTimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idServiceName: {
        type: Sequelize.INTEGER
      },
      idPriorityName: {
        type: Sequelize.INTEGER
      },
      idSLA: {
        type: Sequelize.INTEGER
      },
      correctionTimeVale: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('PB_AvailableCorrectionTimes');
  }
};
