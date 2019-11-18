module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_PMSlaProcedures',
    [
      {
        idPMServiceAsset :1,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :2,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :3,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :4,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :5,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :6,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        idPMServiceAsset :7,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :8,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :9,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :10,
        idSLA :1,
        idFrequency :4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :11,
        idSLA :1,
        idFrequency :6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :12,
        idSLA :1,
        idFrequency :6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPMServiceAsset :13,
        idSLA :1,
        idFrequency :6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_PMSlaProcedures', null, {}),
};
