'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServiceSlaPenalties', {
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
      idPenalty: {
        type: Sequelize.INTEGER
      },
      idKPI: {
        type : Sequelize.INTEGER
      },
      idValueType: {
        type: Sequelize.INTEGER
      },
      value:{
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('PB_ServiceSlaPenalties');
  }
};
