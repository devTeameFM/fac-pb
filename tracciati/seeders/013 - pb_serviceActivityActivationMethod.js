module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceActivityActivationMethods',
    [
      {
        idActivityType  : 1,
        idRemunerationMethod : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idActivityType  : 1,
        idRemunerationMethod : 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceActivityActivationMethods', null, {}),
};
