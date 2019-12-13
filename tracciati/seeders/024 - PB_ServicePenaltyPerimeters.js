module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServicePenaltyPerimeters',
    [
      {
        penaltyPerimeterDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        penaltyPerimeterDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServicePenaltyPerimeters', null, {}),
};
