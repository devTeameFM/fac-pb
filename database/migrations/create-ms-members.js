'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MS_Members', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      idScrum: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      tenant: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('MS_Members');
  }
};
