module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_ScrumsLists',
    [
      {
        idScrum: "creation",
        id     : '0001',
			  name   : 'Describe',
			  description : 'Define your asset portfolio',
			  status :  'BUILDING_INFO',
			  imageURL : 'myspot-icons/simple/building_16.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        id     : '0002',
			  name   : 'Choose',
			  description : 'Select Target Service & SLA',
			  status : 'SLA',
			  imageURL : 'myspot-icons/simple/projector_screen_graph_line.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        id     : '0003',
			  name   : 'Finalize',
			  description : 'Review the technical specification',
			  status : 'REVIEW',
			  imageURL : 'myspot-icons/simple/file_edit_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        id     : '0004',
        name   : 'Publish',
        description : 'Dowload the contract template',
        status : 'PB_READY',
        imageURL : 'myspot-icons/simple/file_check_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "analysis",
        id     : '0005',
        name   : 'Profile',
        description : 'Define your service needs',
        status : 'DEFINE_SERVICE',
        imageURL : 'myspot-icons/simple/file_question_mark_1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "analysis",
        id     : '0006',
        name   : 'Demand',
        description : 'Select the scope of work',
        status : 'SCOPE_WORK',
        imageURL : 'myspot-icons/simple/file_view_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "analysis",
        id     : '0007',
        name   : 'Review',
        description : 'Check the pool of vendors',
        status : 'POOL',
        imageURL : 'myspot-icons/simple/content_view_list.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "analysis",
        id     : '0008',
        name   : 'Select',
        description : 'Select the best vendor\'s offer',
        status : 'REVIEW_VENDORS',
        imageURL : 'myspot-icons/simple/business_man.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "performance",
        id     : '0009',
        name   : 'Check',
        description : 'Connect contracts & transactions',
        status : 'UPLOAD',
        imageURL : 'myspot-icons/simple/credit_card_sync.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "performance",
        id     : '0010',
        name   : 'Assess',
        description : 'Analize the surveys',
        status : 'ANALYZE',
        imageURL : 'myspot-icons/simple/file_view_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "performance",
        id     : '0011',
        name   : 'Report',
        description : 'Monitor Kpi dashboard',
        status : 'MONITOR',
        imageURL : 'myspot-icons/simple/window_graph_pie.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "performance",
        id     : '0012',
        name   : 'Change',
        description : 'Download recommendations',
        status : 'DOWNLOAD',
        imageURL : 'myspot-icons/simple/list_number.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        id     : '0013',
        name   : 'Profile',
        description : 'Your building info',
        status : 'DIGITALIZE',
        imageURL : 'myspot-icons/simple/construction_blueprint_1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        id     : '0014',
        name   : 'Assessment',
        description : 'Update the technical requirements',
        status : 'REVIEW_EXPENSES',
        imageURL : 'myspot-icons/simple/file_edit_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        id     : '0015',
        name   : 'Check',
        description : 'We are working on your raccomandations',
        status : 'REVIEW_EXPENSES',
        imageURL : 'myspot-icons/simple/file_edit_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        id     : '0016',
        name   : 'Target',
        description : 'Identify the expenses and availabilty gap',
        status : 'ANALYZE',
        imageURL : 'myspot-icons/simple/target_cash.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "strategy",
        id     : '0017',
        name   : 'Plan',
        description : 'Define budget and design a program',
        status : 'CREATE_MPB',
        imageURL : 'myspot-icons/simple/calendar_dollar_1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_ScrumsLists', null, {}),
};
