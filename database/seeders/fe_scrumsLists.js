module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_ScrumsLists',
    [
      {
        idScrum: "creation",
        id     : '56027cf5a2ca3839a5d36103',
			  name   : 'Describe',
			  description : 'Define your asset portfolio',
			  status :  'BUILDING_INFO',
			  imageURL : 'myspot-icons/simple/building_16.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        id     : '56127cf2a2ca3539g7d36103',
			  name   : 'Choose',
			  description : 'Select Target Service & SLA',
			  status : 'SLA',
			  imageURL : 'myspot-icons/simple/projector_screen_graph_line.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        id     : 'faf244627326f1249525763d',
			  name   : 'Finalize',
			  description : 'Review the technical specification',
			  status : 'REVIEW',
			  imageURL : 'myspot-icons/simple/file_edit_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idScrum: "creation",
        id     : 'ad7d.9fffac5dff412.c83bca6853767.8fd7549b2b1ca.ceda8a01774c4.a5cf3976e87e4.ce79eeeea',
        name   : 'Publish',
        description : 'Dowload the contract template',
        status : 'PB_READY',
        imageURL : 'myspot-icons/simple/file_check_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_ScrumsLists', null, {}),
};
