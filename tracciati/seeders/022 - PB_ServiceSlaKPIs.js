module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceSlaKPIs',
    [
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 1,
        idFrequency: 4,
        idValueType: 2,
        value: 90,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 2,
        idFrequency: 2,
        idValueType: 2,
        value: 90,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 3,
        idFrequency: 4,
        idValueType: 2,
        value: 95,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 4,
        idFrequency: 4,
        idValueType: 2,
        value: 95,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 5,
        idFrequency: 4,
        idValueType: 2,
        value: 95,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 6,
        idFrequency: 2,
        idValueType: 2,
        value: 90,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 7,
        idFrequency: 2,
        idValueType: 2,
        value: 95,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 8,
        idFrequency: 2,
        idValueType: 2,
        value: 95,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService :1,
        idSLA: 1,
        idCondition: 5,
        idKPI: 9,
        idFrequency: 4,
        idValueType: 2,
        value: 90,
        idUnitMeasure: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceSlaKPIs', null, {}),
};
