const models = require("../database/models");

/*
const getPlaybookById = async (id,res) => {
  try {
    const { surveyId } = id;
    const survey = await models.SM_Survey.findOne({
      where: { id: surveyId },
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections"
        }
      ]
    });
    if (survey) {
      return res.status(200).json({ survey });
    }
    return res.status(404).send("survey with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
*/

function myData() {
   console.log("ciao");
   return 123;
}

const getAllScrums = async (req, res) => {
  try {
    const scrums = await models.FE_Scrum.findAll({
      include: [
        {
          model: models.FE_ScrumsSetting,
          as: "settings"
        },
        {
          model: models.FE_ScrumsList,
          as: "lists"
        },
        {
          model: models.MS_Member,
          as: "members"
        }
      ]
    });
    return res.status(200).json({ scrums });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllPlaybooks = async (req, res) => {
  try {
    const playbooks = await models.PB_Playbook.findAll();
    return res.status(200).json({ playbooks });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const getAllMembers = async (req, res) => {
  try {
    const members = await models.MS_Member.findAll();
    myData();
    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurveyDynamics = async (req, res) => {
  try {
    const surveys = await models['SM_Survey'].findAll({
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections",
          include: [
            {
              model: models.SM_SurveySectionQuestion,
              as: "questions",
            }
          ]
        }
      ]
    });
    for (survey in surveys) {
        for (section in surveys[survey].sections) {
          for (question in surveys[survey].sections[section].questions) {
            //console.log("questions:" + surveys[survey].sections[section].questions[question].name);
            if (surveys[survey].sections[section].questions[question].type === "SELECT") {

              surveys[survey].sections[section].questions[question].set("options",[]);
              //surveys[survey].sections[section].questions[question].push("test");
              console.log("questions:" + JSON.stringify(surveys[survey].sections[section].questions[question]));
            }
          }
	       }
       }


    return res.status(200).json({ surveys });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurvey = async (req, res) => {
  try {
    const surveys = await models.SM_Survey.findAll({
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections",
          include: [
            {
              model: models.SM_SurveySectionQuestion,
              as: "questions",
              include: [
                {
                  model: models.SM_SurveySectionQuestionOption,
                  as: "options"
                }
              ]
            }
          ]
        }
      ]
    });
    return res.status(200).json({ surveys });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSurveyById = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const survey = await models.SM_Survey.findOne({
      where: { id: surveyId },
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections"
        }
      ]
    });
    if (survey) {
      return res.status(200).json({ survey });
    }
    return res.status(404).send("survey with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllScrumsByMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const scrum = await models.FE_Scrum.findOne({
      include: [
        {
          model: models.MS_Member,
          as: "members",
          where: { id: memberId }
        }
      ]
    });
    if (scrum) {
      return res.status(200).json({ scrum });
    }
    return res.status(404).send("This member doesn't have scrums");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurveySection = async (req, res) => {
  try {
    const surveySection = await models.SM_SurveySection.findAll({
      include: [
        {
          model: models.SM_SurveySectionQuestion,
          as: "questions"
        }
      ]
    });
    return res.status(200).json({ surveySection });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurveySectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const surveySection = await models.SM_SurveySection.findOne({
      where: { id: sectionId },
      include: [
        {
          model: models.SM_SurveySectionQuestion,
          as: "questions"
        }
      ]
    });
    if (surveySection) {
      return res.status(200).json({ surveySection });
    }
    return res.status(404).send("survey with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};



const getAllSurveyQuestions = async (req, res) => {
  try {
    const question = await models.SM_SurveySectionQuestion.findAll({

      include: [
        {
          model: models.SM_SurveySectionQuestionOption,
          as: "options"
        }
      ]

    });
    return res.status(200).json({ question });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurveySectionQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const surveySectionQuestion = await models.SM_SurveySectionQuestion.findOne({
      where: { id: questionId },
      include: [
        {
          model: models.SM_SurveySectionQuestionOption,
          as: "options"
        }
      ]
    });
    if (surveySectionQuestion) {
      return res.status(200).json({ surveySectionQuestion });
    }
    return res.status(404).send("survey with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurveyQuestionsOptions = async (req, res) => {
  try {
    const option = await models.SM_SurveySectionQuestionOption.findAll({
    });
    return res.status(200).json({ option });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};








/*
const createPost = async (req, res) => {
  try {
    const post = await models.Post.create(req.body);
    return res.status(201).json({
      post
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
*/

/*
const getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      include: [
        {
          model: models.Comment,
          as: "comments"
        },
        {
          model: models.User,
          as: "author"
        }
      ]
    });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await models.Post.findOne({
      where: { id: postId },
      include: [
        {
          model: models.Comment,
          as: "comments",
          include: [
            {
              model: models.User,
              as: "author"
            }
          ]
        },
        {
          model: models.User,
          as: "author"
        }
      ]
    });
    if (post) {
      return res.status(200).json({ post });
    }
    return res.status(404).send("Post with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const [updated] = await models.Post.update(req.body, {
      where: { id: postId }
    });
    if (updated) {
      const updatedPost = await models.Post.findOne({ where: { id: postId } });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deleted = await models.Post.destroy({
      where: { id: postId }
    });
    if (deleted) {
      return res.status(204).send("Post deleted");
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
*/
module.exports = {
  /*createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,*/
  getAllSurvey,
  getAllSurveyDynamics,
  getSurveyById,
  getAllSurveySection,
  getAllSurveyQuestions,
  getAllSurveySectionById,
  getAllSurveySectionQuestionById,
  getAllSurveyQuestionsOptions,
  getAllMembers,
  getAllPlaybooks,
  getAllScrums,
  getAllScrumsByMember
};
