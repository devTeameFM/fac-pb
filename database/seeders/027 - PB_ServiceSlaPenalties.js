module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServiceSlaPenalties',
    [
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 1,
        idValueType: 1,
        idKPI: 0,
        value: 50,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 2,
        idValueType: 1,
        idKPI: 0,
        value: 1000,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 3,
        idValueType: 1,
        idKPI: 0,
        value: 200,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 4,
        idValueType: 1,
        idKPI: 0,
        value: 200,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 5,
        idValueType: 1,
        idKPI: 0,
        value: 200,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 6,
        idValueType: 1,
        idKPI: 0,
        value: 50,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 7,
        idValueType: 1,
        idKPI: 0,
        value: 500,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 8,
        idValueType: 1,
        idKPI: 0,
        value: 100,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 9,
        idValueType: 2,
        idKPI: 1,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 10,
        idValueType: 2,
        idKPI: 2,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 11,
        idValueType: 2,
        idKPI: 3,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 12,
        idValueType: 2,
        idKPI: 4,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA: 1,
        idPenalty: 13,
        idValueType: 2,
        idKPI: 5,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 14,
        idValueType: 2,
        idKPI: 6,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 15,
        idValueType: 2,
        idKPI: 7,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 16,
        idValueType: 2,
        idKPI: 8,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idService : 1,
        idSLA:  1,
        idPenalty: 17,
        idValueType: 2,
        idKPI: 9,
        value: 0.01,
        idUnitMeasure: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServiceSlaPenalties', null, {}),
};
