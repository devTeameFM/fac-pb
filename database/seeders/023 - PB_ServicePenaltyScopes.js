module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServicePenaltyScopes',
    [
      {
        penaltyScopeName:"PENALTIES RELATED TO THE PERFORMANCE MONITORING SYSTEM",
        penaltyScopeDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        penaltyScopeName:"PENALTIES RELATED TO SPECIFIC NON CONFORMITIES",
        penaltyScopeDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServicePenaltyScopes', null, {}),
};
