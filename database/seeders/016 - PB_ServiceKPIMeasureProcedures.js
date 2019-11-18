module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceKPIMeasureProcedures',
    [
      {
        measureProcedureDescription:"Survey",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        measureProcedureDescription:"Information System",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        measureProcedureDescription:"Inspection",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceKPIMeasureProcedures', null, {}),
};
