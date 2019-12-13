module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceExtensionRules',
    [
      {
        name : "Upon request 30 days before the termination",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name : "Upon request 60 days before the termination",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceExtensionRules', null, {}),
};
