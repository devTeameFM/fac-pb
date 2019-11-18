module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_PMProcedures',
    [
      {
        idServiceAsset :1,
        activityDescription: "Exposed ductwork will be checked for leaks and proper insulation",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Belts and pulleys will be inspected and adjusted as required - Belts replaced as required",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Thermostats will be checked and calibrated as required",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Motors and Bearings will be lubricated as required",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Controls and safeties will be tested",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Condensate drain will be checked and cleaned as required",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Relays and contactors will be inspected",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Unit wiring will be inspected",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Temperatures and pressures will be recorded",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Inspection report and prompt follow up of any abnormal conditions or necessary repairs",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "External cleaning of the equipment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Internal cleaning of the equipment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idServiceAsset :1,
        activityDescription: "Tightening bolts",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_PMProcedures', null, {}),
};
