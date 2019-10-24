module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'SM_Surveys',
    [
      {
        name: 'Building info',
        code: 'buildingInfo',
        nextStatus: "SLA",
        imageURL: "myspot-icons/line/building.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SLA',
        code: 'sla',
        nextStatus: "REVIEW",
        imageURL: "myspot-icons/line/building.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'REVIEW',
        code: 'review',
        nextStatus: "PB_READY",
        imageURL: "myspot-icons/line/building.png",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SM_Surveys', null, {}),
};
