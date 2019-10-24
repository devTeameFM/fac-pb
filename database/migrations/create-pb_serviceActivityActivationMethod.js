'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_ServiceActivityActivationMethod', {
      idServiceActivityActivationMethod: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idActivityType: {
        type: Sequelize.INTEGER
      },
      idRemunerationMethod: {
        type: Sequelize.INTEGER
      },
      ActivityTypeName: {
        type: Sequelize.STRING
      },
      RemunerationMethodTypeName: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PB_ServiceActivityActivationMethod');
  }
};
