module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_Services',
    [
      {
        idServiceClass: 1,
        serviceName: "HVAC",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 1,
        serviceName: "Firefighting",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 1,
        serviceName: "Electrical system",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 1,
        serviceName: "Elevators",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 1,
        serviceName: "Plumbing",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 1,
        serviceName: "Civil works",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 2,
        serviceName: "Cleaning ",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 2,
        serviceName: "Consumables Restocking",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceClass: 2,
        serviceName: "Office Supplies Restocking",
        serviceDescription:"",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_Services', null, {}),
};
