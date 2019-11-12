'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServicePenalties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPenaltyScope: {
        type: Sequelize.INTEGER
      },
      penaltyName: {
        type: Sequelize.STRING
      },
      penaltyDescription: {
        type: Sequelize.STRING
      },
      indicatoreArea: {
        type: Sequelize.STRING
      },
      idPenaltyPerimeter:{
        type: Sequelize.INTEGER
      },
      idPenaltyType: {
        type: Sequelize.INTEGER
      },
      isActive: {
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
    return queryInterface.dropTable('PB_ServicePenalties');
  }
};
