module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'MS_Members',
    [
      {
        id    : '5d494dc959860e001747eb4f',
        name  : 'Daniele Appetito',
        avatar: '6a85310a-e642-42f0-99d6-9a1134f7a5cc_jidd4l.jpg',
        tenant: 'WE WORK',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('MS_Members', null, {}),
};
