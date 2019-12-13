module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceClasses',
    [
      {
        name  : 'Hard service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : 'Soft service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : 'Logistics service',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceClasses', null, {}),
};
