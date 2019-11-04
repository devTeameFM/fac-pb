module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceActivityActivationMethods',
    [
      {
        idActivityType  : 1,
        idRemunerationMethod : 1,
        activityTypeName: "Scheduled activities",
        remunerationMethodTypeName: "Fixed Fee",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idActivityType  : 1,
        idRemunerationMethod : 4,
        activityTypeName: "Scheduled activities",
        remunerationMethodTypeName: "Out of scope",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceActivityActivationMethods', null, {}),
};
