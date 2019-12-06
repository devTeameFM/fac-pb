module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_ScrumsListsActions',
    [
      {
        idList: "0001",
        code  : 'building-info',
			  name   : 'Insert info',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idList: "0002",
        code  : 's-l-a',
			  name   : 'Choose Sla',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idList: "0003",
        code  : 'review',
			  name   : 'Review & confirm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idList: "0004",
        code  : 'playbook',
			  name   : 'Download & share',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_ScrumsListsActions', null, {}),
};
