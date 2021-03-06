module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceSlaResponseTypes',
    [
      {
        idService : 1,
        idServiceResponseType: 1,
        idServicePriority : 1,
        idServiceLevelAgreement: 1,
        target : "<  4 hours",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idServiceResponseType: 1,
        idServicePriority : 2,
        idServiceLevelAgreement: 1,
        target : "< 8 hours",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idServiceResponseType: 1,
        idServicePriority : 3,
        idServiceLevelAgreement: 1,
        target : "< 36 hours",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idServiceResponseType: 2,
        idServicePriority : 1,
        idServiceLevelAgreement: 1,
        target : "< 8 hours",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idServiceResponseType: 2,
        idServicePriority : 2,
        idServiceLevelAgreement: 1,
        target : "< 16 hours",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idServiceResponseType: 2,
        idServicePriority : 3,
        idServiceLevelAgreement: 1,
        target : "Proposed by the Provider and approved by the Client",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceSlaResponseTypes', null, {}),
};
