
const { Router } = require('express');
const controllers = require('../controller');
//const scrumController = require('../controller').scrum;

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))
//router.get('/scrums/:memberId',controllers.getAllScrumsByMember);
router.get('/scrums/:scrumId',controllers.getScrumById);
router.get('/scrums',controllers.getAllScrums);

router.get('/members',controllers.getAllMembers);

router.get('/contract',controllers.getAllContracts);
router.get('/contract/:contractId',controllers.getContractById);
router.post('/contract',controllers.createPlaybook);
router.post('/contractWithSurvey',controllers.createPlaybookWithSurvey);
router.delete('/contract',controllers.deletePlaybooks);

router.put('/contract/:playBookId',controllers.updateContract);
router.post('/updateQuestions', controllers.generateQuestions);

//SOLO PER DEVELOP
router.get('/surveys', controllers.getAllSurveyDynamics);
router.get('/surveys/:surveyType', controllers.getAllSurveyByType);
router.get('/dynamic/:tableName',controllers.getDynamicOptions)
router.delete('/clean',controllers.cleandDB)
router.post('/surveys/import', controllers.importQuestionsFromJSON);
router.post('/surveys/import/:playBookId', controllers.addSurvey);
router.get('/services', controllers.getAllServices);
router.get('/serviceResponseType', controllers.getServiceResponseType);
router.get('/serviceLevelAgreement', controllers.getServiceLevelAgreement);






module.exports = router;
