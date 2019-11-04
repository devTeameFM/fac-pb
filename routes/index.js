
const { Router } = require('express');
const controllers = require('../controller');
//const scrumController = require('../controller').scrum;

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))
//router.get('/scrums/:memberId',controllers.getAllScrumsByMember);
router.get('/scrums/:scrumId',controllers.getScrumById);
router.get('/scrums',controllers.getAllScrums);

router.get('/members',controllers.getAllMembers);

router.get('/playbooks',controllers.getAllPlaybooks);
router.post('/contract',controllers.createPlaybook);

router.put('/contract',controllers.putTest);

router.get('/surveys', controllers.getAllSurveyDynamics);
router.get('/surveys/:surveyType', controllers.getAllSurveyByType);
router.get('/dynamic/:tableName',controllers.getDynamicOptions)

//router.get('/test',scrumController.getAllUserEarnings);
//router.get('/surveys/:surveyId', controllers.getSurveyById);
//router.get('/surveysSections', controllers.getAllSurveySection);
//router.get('/surveysSections/:sectionId', controllers.getAllSurveySectionById);
//router.get('/surveysSectionsQuestions', controllers.getAllSurveyQuestions);
//router.get('/surveysSectionsQuestions/:questionId', controllers.getAllSurveySectionQuestionById);
//router.get('/surveysSectionsQuestionsOptions/',controllers.getAllSurveyQuestionsOptions)
/*
router.post('/posts', controllers.createPost);
router.get('/posts', controllers.getAllPosts);
router.get('/posts/:postId', controllers.getPostById);
router.put('/posts/:postId', controllers.updatePost);
router.delete('/posts/:postId', controllers.deletePost);
*/
module.exports = router;
