'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServiceSlaResponseType', {
      idServiceSlaResponseType: {
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
      serviceName: {
        type: Sequelize.STRING
      },
      serviceResponseTypeName: {
        type: Sequelize.STRING
      },
      servicePriorityName: {
        type: Sequelize.STRING
      },
      serviceLevelAgreementName: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PB_ServiceSlaResponseType');
  }
};
