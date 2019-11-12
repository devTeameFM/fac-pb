module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceActivationMethods',
    [
      {
        remunerationMethodTypeName  : "Fixed Fee",
        remunerationMethodDescription : "Remuneration system based on a fixed cost paid at a predetermined frequence (e.g. monthly, yearly, etc.) ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        remunerationMethodTypeName  : "Extra Fee",
        remunerationMethodDescription : "Remuneration system based on a variable cost that depend on the activity and on a budget estimated subjected to client's approval ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        remunerationMethodTypeName  : "Fixed Fee + Threshold",
        remunerationMethodDescription : "Remuneration system that establish an cost limit under which the activities are included in the fixed cost and over which it is necessary a budget estimate",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        remunerationMethodTypeName  : "Out of scope",
        remunerationMethodDescription : "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceActivationMethods', null, {}),
};
