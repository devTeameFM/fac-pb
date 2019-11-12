module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceHoursWindows',
    [
      {
        name  : '9 am to 7 pm - Monday to Friday',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name  : '8 am to 8 pm - Monday to Sunday',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceHoursWindows', null, {}),
};
