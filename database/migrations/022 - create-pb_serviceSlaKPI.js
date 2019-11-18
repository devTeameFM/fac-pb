'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServiceSlaKPIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idService: {
        type: Sequelize.INTEGER
      },
      idSLA: {
        type: Sequelize.INTEGER
      },
      idCondition: {
        type: Sequelize.INTEGER
      },
      idKPI: {
        type: Sequelize.INTEGER
      },
      idFrequency:{
        type: Sequelize.INTEGER
      },
      idValueType: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      idUnitMeasure: {
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
    return queryInterface.dropTable('PB_ServiceSlaKPIs');
  }
};
