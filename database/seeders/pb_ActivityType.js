module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ActivityTypes',
    [
      {
        ActivityTypeName: "Scheduled activities",
        ActivityTypeDescription:"Maintenance that is carried out at set intervals to ensure a smooth production line",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ActivityTypeName: "Corrective activities",
        ActivityTypeDescription:"Maintenance performed to return equipment to proper working order. ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ActivityTypeName: "Service activities",
        ActivityTypeDescription:"Extensive repairs to property or equipment which prolong its useful life and increase its book value",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ActivityTypeName: "On site activities",
        ActivityTypeDescription:"……………",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ActivityTypes', null, {}),
};
