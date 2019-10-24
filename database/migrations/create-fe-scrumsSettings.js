'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FE_ScrumsSettings', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      idScrum: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      subscribed: {
        type: Sequelize.BOOLEAN
      },
      cardCoverImages: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('FE_ScrumsSettings');
  }
};
