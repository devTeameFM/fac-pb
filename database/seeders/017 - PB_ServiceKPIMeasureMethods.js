module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceKPIMeasureMethods',
    [
      {
        measureMethodDescription:"Customer Survey campaign",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        measureMethodDescription:"Feedback regarding each activity delivered by the Provider",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        measureMethodDescription:"Analysis of the information uploaded to the System ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        measureMethodDescription:"Field Inspection with dedicated check list ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        measureMethodDescription:"Field Inspection with dedicated control activities ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceKPIMeasureMethods', null, {}),
};
