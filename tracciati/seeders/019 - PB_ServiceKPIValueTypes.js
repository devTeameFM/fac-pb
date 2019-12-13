module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceKPIValueTypes',
    [
      {
        valueTypeName :"unit value",
        valueMeasureUnit: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        valueTypeName :"rate value",
        valueMeasureUnit: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceKPIValueTypes', null, {}),
};
