module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_PlaybooksSurveys',
    [
      {
        idTask: 1,
        idSurvey    : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idTask: 1,
        idSurvey    : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idTask: 1,
        idSurvey    : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_PlaybooksSurveys', null, {}),
};
