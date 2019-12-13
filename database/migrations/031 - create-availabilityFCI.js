'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_AvailabilityFCIs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idServiceName: {
        type: Sequelize.INTEGER
      },
      idFci: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.TEXT
      },
      estimated: {
        type: Sequelize.TEXT
      },
      definition: {
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
    return queryInterface.dropTable('PB_AvailabilityFCIs');
  }
};
