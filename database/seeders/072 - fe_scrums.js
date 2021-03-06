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
        order: 0,
        type : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "creation",
        name: 'DESIGN',
        description: 'Establish your baseline technical requirements',
        imageURL: "myspot-icons/scrumboards/document-approve.png",
        uri: "",
        order: 1,
        type : "PLAYBOOK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "performance",
        name: 'ANALYZE',
        description: 'Monitor your service and contract results and kpi',
      	imageURL : 'myspot-icons/scrumboards/business-graph-2.png',
        uri: "",
        order: 2,
        type : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "management",
        name: 'MANAGEMENT',
        description: 'Facility management system',
      	imageURL : 'myspot-icons/scrumboards/desktop-imac-chart.png"',
        uri: "",
        order: 3,
        type : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "strategy",
        name: 'IMPROVE',
        description: 'Define your budget and plan the maintenance activities',
        imageURL : 'myspot-icons/scrumboards/business-graph-2.png',
        uri: "",
        order: 4,
        type : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_Scrums', null, {}),
};
