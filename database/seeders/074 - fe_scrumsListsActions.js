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
      }
    ]
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_ScrumsListsActions', null, {}),
};
