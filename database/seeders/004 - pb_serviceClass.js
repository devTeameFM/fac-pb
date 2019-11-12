module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceClasses',
    [
      {
        name  : 'Hard Services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : 'Soft Services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : 'Logistics Services',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceClasses', null, {}),
};
