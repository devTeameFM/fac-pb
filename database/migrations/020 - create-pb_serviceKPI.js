'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServiceKPIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idKpiScope: {
        type: Sequelize.INTEGER
      },
      kpiName: {
        type: Sequelize.STRING
      },
      idKpiType: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      idMeasuringProcedures:{
        type: Sequelize.INTEGER
      },
      idMeasuringMethod: {
        type: Sequelize.INTEGER
      },
      calculateProcedure: {
        type: Sequelize.STRING
      },
      idRespType: {
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
    return queryInterface.dropTable('PB_ServiceKPIs');
  }
};
