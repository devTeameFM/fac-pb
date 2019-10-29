module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_MembersScrums',
    [
      {
        idScrum: "analysis",
        idMember    : '76027g1930450d8bf7b10958',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        idMember    : '76027g1930450d8bf7b10958',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "performance",
        idMember    : '76027g1930450d8bf7b10958',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "management",
        idMember    : '76027g1930450d8bf7b10958',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        idMember    : '76027g1930450d8bf7b10958',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_MembersScrums', null, {}),
};
