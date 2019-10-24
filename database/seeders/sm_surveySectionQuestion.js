module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'SM_SurveySectionQuestions',
    [
      {
        idSection: 1,
        code: 'code',
		    name: 'Building',
		    tooltip: 'Select building location in the scope of work',
    		nameI98n: '',
    		tooltipI18n: '',
    		type: 'SELECT',
    		icon: 'business',
    		required: true,
    		flow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSection: 1,
        code: 'area',
    		name: 'Total Served Area (sqft)',
    		tooltip: 'Define the gross total area that must be served',
    		nameI98n: '',
    		tooltipI18n: '',
    		icon: 'tab_unselected',
    		type: 'NUMBER',
    		flow: true,
    		required: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
    		idSection: 1,
    		code: 'floors',
    		name: 'Number of Floors',
    		tooltip: 'Define the number of floors involved in the service',
    		nameI98n: '',
    		tooltipI18n: '',
    		icon: 'view_agenda',
    		type: 'NUMBER',
    		flow: true,
    		required: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSection: 1,
    		code: 'serviceHours',
    		name: 'Service Hours',
    		tooltip: 'Select the contract service hours',
    		nameI98n: '',
    		tooltipI18n: '',
    		icon: 'access_time',
    		type: 'SELECT',
    		required: true,
    		flow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idSection: 1,
        code: 'code',
    		name: 'Building',
    		tooltip: 'Select building location in the scope of work',
    		nameI98n: '',
    		tooltipI18n: '',
    		type: 'SELECT',
    		icon: 'business',
    		required: true,
    		flow: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('SM_SurveySectionsQuestions', null, {}),
};
