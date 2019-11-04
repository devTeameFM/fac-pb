module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceDurations',
    [
      {
        name  : '12 months',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : '24 months',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : '36 months',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : '48 months',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceDurations', null, {}),
};
