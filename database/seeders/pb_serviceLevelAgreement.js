module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceLevelAgreements',
    [
      {
        serviceLevelAgreementName  : 'HIGH',
        serviceLevelAgreementDescription : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceLevelAgreementName  : 'MEDIUM',
        serviceLevelAgreementDescription : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceLevelAgreementName  : 'LOW',
        serviceLevelAgreementDescription : "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceLevelAgreementName  : 'BASIC',
        serviceLevelAgreementDescription : "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceLevelAgreements', null, {}),
};
