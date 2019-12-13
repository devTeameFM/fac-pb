module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_Frequencies',
    [
      {
        frequency: "Weekly",
        comments: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        frequency: "Monthly",
        comments: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        frequency: "Every Two Months",
        comments: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        frequency: "Quarterly",
        comments: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        frequency: "Bi-annual",
        comments: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        frequency: "Yearly",
        comments: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_Frequencies', null, {}),
};
