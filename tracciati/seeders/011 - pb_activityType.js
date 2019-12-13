module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ActivityTypes',
    [
      {
        activityTypeName : "Scheduled activities",
        activityTypeDescription : "Maintenance that is carried out at set intervals to ensure a smooth production line",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        activityTypeName    : "Corrective activities",
        activityTypeDescription : "Maintenance performed to return equipment to proper working order. ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        activityTypeName    : "Service activities",
        activityTypeDescription : "Extensive repairs to property or equipment which prolong its useful life and increase its book value",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ,
      {
        activityTypeName    : "On site activities",
        activityTypeDescription : "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ActivityTypes', null, {}),
};
