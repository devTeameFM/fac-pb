module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceKPIs',
    [
      {
        idKpiScope :2,
        kpiName: "B.1 Cold satisfaction",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 1,
        idMeasuringMethod: 1,
        calculateProcedure: "Ratio between the sum of the scores related to the Service Level VS maximum possible score" ,
        idRespType: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.2 Hot satisfaction",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 2,
        idMeasuringMethod: 2,
        calculateProcedure: "Ratio between the score attributed to each activity carried out VS maximum possible score" ,
        idRespType: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.3 Compliance with the agreed Scheduled Activities Plan",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 2,
        idMeasuringMethod: 3,
        calculateProcedure: "Number of activities completed according to Scheduled VS total activities scheduled" ,
        idRespType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.4 Compliance with the agreed Response Time",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 2,
        idMeasuringMethod: 3,
        calculateProcedure: "Number of corrective activities started within SLA VS total number of corrective activities" ,
        idRespType: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.5 Compliance with the agreed Correction Time",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 2,
        idMeasuringMethod: 3,
        calculateProcedure: "Number of corrective activities completed within SLA VS total number of corrective activities" ,
        idRespType: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.6 Compliance with quality provided",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 3,
        idMeasuringMethod: 4,
        calculateProcedure: "Number of compliance VS Number of total inspections" ,
        idRespType: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.7 Compliance with system Performance Level",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 2,
        idMeasuringMethod: 5,
        calculateProcedure: "Number of compliance VS Number of total inspections" ,
        idRespType: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.8 Compliance with the Health & Safety Procedures",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 3,
        idMeasuringMethod: 3,
        calculateProcedure: "Number of compliance VS Number of total inspections" ,
        idRespType: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKpiScope :2,
        kpiName: "B.9 Compliance with Budget Estimate Time Limit ",
        idKpiType: 0,
        isActive: true,
        idMeasuringProcedures: 2,
        idMeasuringMethod: 3,
        calculateProcedure: "Number of Budget Estimates delivered within SLA VS Total Number of Budget Estimate Delivered" ,
        idRespType: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceKPIs', null, {}),
};
