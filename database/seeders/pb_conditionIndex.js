module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ConditionIndices',
    [
      {
        LevelTypeName:"Excellent",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        LevelTypeName:"Good",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        LevelTypeName:"Fair",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        LevelTypeName:"Poor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        LevelTypeName:"N/A",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ConditionIndices', null, {}),
};
