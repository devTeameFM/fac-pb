
const { Router } = require('express');
const controllers = require('../controller');
const scrumControllers = require('../controller/scrumController.js')
//const scrumController = require('../controller').scrum;

const router = Router();


router.get('/scrums/:scrumId',scrumControllers.getScrumById);
router.get('/scrums',scrumControllers.getAllScrums);
router.get('/members',controllers.getAllMembers);


router.post('/contract',controllers.createPlaybook);
router.delete('/contract',controllers.deletePlaybooks);
router.get('/playbook',controllers.getAllContracts);

router.post('/playbook',controllers.createPlaybookWithSurvey);
router.get('/playbook/:contractId',controllers.getContractById);
router.put('/playbook/:playBookId',controllers.updateContract);

router.delete('/clean',controllers.cleandDB)


router.post('/surveys/import', controllers.importQuestionsFromJSON);
//SOLO PER DEVELOP
/*
//router.get('/', (req, res) => res.send('Welcome'))
//router.get('/scrums/:memberId',controllers.getAllScrumsByMember);
router.get('/surveys', controllers.getAllSurveyDynamics);
router.get('/surveys/:surveyType', controllers.getAllSurveyByType);
router.get('/dynamic/:tableName',controllers.getDynamicOptions)
router.delete('/clean',controllers.cleandDB)

router.post('/surveys/import/:playBookId', controllers.addSurvey);
router.get('/services', controllers.getAllServices);
router.get('/serviceResponseType', controllers.getServiceResponseType);
router.get('/serviceLevelAgreement', controllers.getServiceLevelAgreement);*/
//router.get('/view',controllers.view)
//router.put('/contract/:playBookId',controllers.updateContract);
//router.post('/updateQuestions', controllers.generateQuestions);







module.exports = router;
