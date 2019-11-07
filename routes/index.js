
const { Router } = require('express');
const controllers = require('../controller');
//const scrumController = require('../controller').scrum;

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))
//router.get('/scrums/:memberId',controllers.getAllScrumsByMember);
router.get('/scrums/:scrumId',controllers.getScrumById);
router.get('/scrums',controllers.getAllScrums);

router.get('/members',controllers.getAllMembers);

router.get('/contract',controllers.getAllPlaybooks);
router.get('/contract/:contractId',controllers.getContractById);
router.post('/contract',controllers.createPlaybook);

router.put('/contract',controllers.putTest);

router.get('/surveys', controllers.getAllSurveyDynamics);
router.get('/surveys/:surveyType', controllers.getAllSurveyByType);
router.get('/dynamic/:tableName',controllers.getDynamicOptions)

module.exports = router;
