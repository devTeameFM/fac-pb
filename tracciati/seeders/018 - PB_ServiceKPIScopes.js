module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceKPIScopes',
    [
      {
        kpiScopeName :"AVAILABILITY",
        kpiScopeDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kpiScopeName :"QUALITY PROVIDED",
        kpiScopeDescription: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceKPIScopes', null, {}),
};
