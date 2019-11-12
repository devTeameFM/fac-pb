module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'FE_ScrumsSettings',
    [
      {
        id: "analysis",
        idScrum: "creation",
        color          : 'fuse-dark',
		    subscribed     : false,
		    cardCoverImages: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FE_ScrumsSettings', null, {}),
};
