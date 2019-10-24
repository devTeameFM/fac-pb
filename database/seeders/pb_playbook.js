module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_Playbooks',
    [
      {
        idMembers: '76027g1930450d8bf7b10958',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_Playbooks', null, {}),
};
