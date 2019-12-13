module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ConditionIndices',
    [
      {
        levelTypeName:"Excellent",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelTypeName:"Good",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelTypeName:"Fair",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelTypeName:"Poor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelTypeName:"N/A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ConditionIndices', null, {}),
};
