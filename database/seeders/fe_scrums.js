module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_Scrums',
    [
      {
        id: "analysis",
        name: 'DEMAND',
        description: 'Create your market analysis and select the vendors',
        imageURL: "myspot-icons/scrumboards/business-team.png",
        uri: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "creation",
        name: 'DESIGN',
        description: 'Establish your baseline technical requirements',
        imageURL: "myspot-icons/scrumboards/document-approve.png",
        uri: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SM_Surveys', null, {}),
};
