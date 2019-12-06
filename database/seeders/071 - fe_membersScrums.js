module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_MembersScrums',
    [
      {
        idScrum: "analysis",
        idMember    : '5d494dc959860e001747eb4f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        idMember    : '5d494dc959860e001747eb4f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "performance",
        idMember    : '5d494dc959860e001747eb4f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "management",
        idMember    : '5d494dc959860e001747eb4f',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        idMember    : '5d494dc959860e001747eb4f',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_MembersScrums', null, {}),
};
