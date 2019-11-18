module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServicePenaltyTypes',
    [
      {
        penaltyTypeDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        penaltyTypeDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServicePenaltyTypes', null, {}),
};
