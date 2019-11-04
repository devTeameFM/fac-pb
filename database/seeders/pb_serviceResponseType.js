module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceResponseTypes',
    [
      {
        serviceResponseTypeName  : 'Response Time',
        serviceResponseTypeDescription : "The time used by the Service Provider to take charge of the activity (from client request creation to on site intervention)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceResponseTypeName  : 'Correction Time',
        serviceResponseTypeDescription : "The time used by the Service Provider to close the client request (from the beginning of the on-site intervention to the functional recovery)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceResponseTypeName  : 'Estimate Time',
        serviceResponseTypeDescription : "Depending on the urgency level of the specific request (only for extra fee activities) the service provider should respect a predetermined time frame to deliver the budget estimation, as described below",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        serviceResponseTypeName  : 'NA',
        serviceResponseTypeDescription : "Not applicable",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceResponseTypes', null, {}),
};
