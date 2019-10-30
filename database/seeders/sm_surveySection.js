module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'SM_SurveySections',
    [
      {
        idSurvey: 1,
        name: 'Building Information',
        code: 'buildingInformation',
        imageURL: "myspot-icons/line/building-info.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSurvey: 1,
        name: 'Contract Period',
        code: 'contractPeriod',
        imageURL: "myspot-icons/line/contract-time.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSurvey: 1,
        name: 'Service in Scope',
        code: 'serviceInScope',
        imageURL: "myspot-icons/line/service.png",
        tooltip:"Select the requested Service",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSurvey: 2,
        name: 'Activities in Scope',
        code: 'activitiesInScope',
        imageURL: "myspot-icons/line/activities-in-scope.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSurvey: 3,
        name: 'Review',
        code: 'review',
        imageURL: "myspot-icons/line/activities-in-scope.png",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SM_SurveySections', null, {}),
};
