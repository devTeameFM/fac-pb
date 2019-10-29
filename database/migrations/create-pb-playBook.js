'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PB_Playbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: true,
        type:Sequelize.STRING
      },
      description: {
        allowNull: true,
        type:Sequelize.STRING
      },
      idMember: {
        allowNull: false,
        type: Sequelize.STRING
      },
      typeTask: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status:{
        allowNull: true,
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
    return queryInterface.dropTable('PB_Playbooks');
  }
};
