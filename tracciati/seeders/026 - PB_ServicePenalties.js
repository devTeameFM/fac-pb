module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'PB_ServicePenalties',
    [
      {
        idPenaltyScope : 2,
        penaltyName: "Documents to deliver",
        penaltyDescription: "Failure to meet creation or delivery deadlines, for documents to be provided in the contract",
        indicatoreArea: "Documents to deliver",
        idPenaltyPerimeter: 1,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Team Meetings",
        penaltyDescription: "Non-participation of a Provider's representative on the regular meetings defined by the contract",
        indicatoreArea: "Team Meetings",
        idPenaltyPerimeter: 1,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Health and Safety 1",
        penaltyDescription: "Non-compliance with critical safety rules or intervention procedures",
        indicatoreArea: "Health and Safety",
        idPenaltyPerimeter: 1,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Health and Safety 2",
        penaltyDescription: "Non-compliance with the wearing of PPE",
        indicatoreArea: "Health and Safety",
        idPenaltyPerimeter: 2,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Activity to deliver traceability",
        penaltyDescription: "Absence of traceability of a planned activity/request on the Information System",
        indicatoreArea: "Activity to deliver traceability",
        idPenaltyPerimeter: 1,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Master Data",
        penaltyDescription: "Master Data development and updating delay",
        indicatoreArea: "Master Data",
        idPenaltyPerimeter: 1,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Repetition of non-conformity",
        penaltyDescription: "Repetition of a failure/non-conformity on the same equipment/area/element",
        indicatoreArea: "Repetition of non-conformity",
        idPenaltyPerimeter: 3,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 2,
        penaltyName: "Extemporaneous check ",
        penaltyDescription: "Non-conformity detected on filed (not during an inspection)",
        indicatoreArea: "Extemporaneous check ",
        idPenaltyPerimeter: 3,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "A.1 Compliance with availability index",
        penaltyDescription: "Penalty of A.1 Compliance with availability index KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.1 Cold satisfaction",
        penaltyDescription: "Penalty of B.1 Cold satisfaction KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.2 Hot satisfaction",
        penaltyDescription: "Penalty of B.2 Hot satisfaction KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.3 Compliance with the agreed Scheduled Activities Plan",
        penaltyDescription: "Penalty of B.3 Compliance with the agreed Scheduled Activities Plan KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.4 Compliance with the agreed Response Time",
        penaltyDescription: "Penalty of B.4 Compliance with the agreed Response Time  KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.5 Compliance with the agreed Correction Time",
        penaltyDescription: "Penalty of B.5 Compliance with the agreed Correction Time KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.6 Compliance with quality provided",
        penaltyDescription: "Penalty of B.6 Compliance with quality provided KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.7 Compliance with system Performance Level",
        penaltyDescription: "Penalty of B.7 Compliance with system Performance Level KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.8 Compliance with the Health & Safety Procedures",
        penaltyDescription: "Penalty of B.8 Compliance with the Health & Safety Procedures KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idPenaltyScope : 1,
        penaltyName: "B.9 Compliance with Budget Estimate Time Limit",
        penaltyDescription: "Penalty of B.9 Compliance with Budget Estimate Time Limit  KPI",
        indicatoreArea: "",
        idPenaltyPerimeter: 4,
        idPenaltyType: 1,
        isActive: true ,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('PB_ServicePenalties', null, {}),
};
