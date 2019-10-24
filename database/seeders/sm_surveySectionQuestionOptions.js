module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'SM_SurveySectionQuestionOptions',
    [
      {
        idQuestion: 4,
        name: '9 am to 7 pm - Monday to Friday',
        defaultValue: '9 am to 7 pm - Monday to Friday',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idQuestion: 4,
        name: '8 am to 8 pm - Monday to Sunday',
        defaultValue: '9 am to 7 pm - Monday to Sunday',
        disabled: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SM_SurveySectionQuestionOptions', null, {}),
};
