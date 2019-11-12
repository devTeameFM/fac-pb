'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServiceSlaResponseTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idService: {
        type: Sequelize.INTEGER
      },
      idServiceResponseType: {
        type: Sequelize.INTEGER
      },
      idServicePriority: {
        type: Sequelize.INTEGER
      },
      idServiceLevelAgreement: {
        type: Sequelize.INTEGER
      },
      target: {
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
    return queryInterface.dropTable('PB_ServiceSlaResponseTypes');
  }
};
