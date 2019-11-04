module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'MS_Buildings',
    [
      {
        idMember : '76027g1930450d8bf7b10958',
        name  : '51 Melcher St',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idMember : '76027g1930450d8bf7b10958',
        name  : '625 Massachusetts Ave',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('MS_Buildings', null, {}),
};
