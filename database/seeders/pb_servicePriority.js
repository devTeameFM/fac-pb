module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServicePriorities',
    [
      {
        servicePriorityName: "Emergency",
        servicePriorityDescription:"Activities that, if not performed, may create an immediate risk to people’s health or may damage the building installations/equipment.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        servicePriorityName: "Urgency",
        servicePriorityDescription:"Activities that, if not performed, also temporarily, may create a risk to people’s health or may damage the building installations/equipment.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        servicePriorityName: "Routine",
        servicePriorityDescription:"Activities that, if not performed quickly, do not pose a risk to people's health or do not damage property, people and buildings.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServicePriorities', null, {}),
};
