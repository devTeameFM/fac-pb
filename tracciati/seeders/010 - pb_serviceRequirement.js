module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceRequirements',
    [
      {
        idService:  1,
        serviceRequirementDescription: "Building and specific equipment temperatures, humidity, and air flow rates will be operated and controlled at set points to promote productivity, support operations, and provide a safe and comfortable work environment while minimizing energy use;",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService:  1,
        serviceRequirementDescription: "Adapt operating profile to leverage best price power option (e.g., steam vs. electric);",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService:  1,
        serviceRequirementDescription: "Schedule chiller plant operations to manage utility peak rates and load shed to maximize demand control benefits from utility providers;",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService:  1,
        serviceRequirementDescription: "Analyze chiller performance versus design to determine fouling factor, cleaning schedule optimization, and water treatment chemical adjustments;",
        serviceName:"HVAC",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceRequirements', null, {}),
};
