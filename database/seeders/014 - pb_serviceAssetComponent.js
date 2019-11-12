module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceAssetComponents',
    [
      {
        idService: 1,
        assetComponentType:"Technical rooms",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService: 1,
        assetComponentType:"Fuel Piping Systems",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService: 1,
        assetComponentType:"Fuel Pumps",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService: 1,
        assetComponentType:"Fuel Storage Tank",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService: 1,
        assetComponentType:"Expansion Tanks",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService: 1,
        assetComponentType:"Hydronic Piping System",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceAssetComponents', null, {}),
};
