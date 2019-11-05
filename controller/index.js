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
const getTest = async () => {
  const output = await models[""].findAll({
  });
}


const getDynamicOptions = async (req, res) => {
    const { tableName } = req.params;
    //console.log(tableName);
    var questions=await models['SM_SurveySectionQuestion'].findAll();

    var table=[];
    for (q in questions) {
      //console.log("TEST:" + q);
      if (questions[q].type==="SELECT") {
        console.log("TEST:" + questions[q].tableInput);
        var datas=await models[questions[q].tableInput].findAll();
        table.push(datas);
      }
    }


    const output = await models[req.params.tableName].findAll({
    });
    /*
    var surveys = await models['SM_Survey'].findAll({
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

    /*
    var response={
      "output" : output,
      "surveys" : s
    }*/

    return res.status(200).json({ output });
};

function myData() {
   console.log("ciao");
   return 123;
}

const putTest = async (req, res) => {
  try {
    const  bodyMsg  = req.body;
    console.log(bodyMsg);
    return res.status(200).json({ bodyMsg });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const getAllScrums = async (req, res) => {
  try {
    const scrums = await models.FE_Scrum.findAll({
      order: [['order', 'ASC']],
      include: [
        {
          model: models.FE_ScrumsSetting,
          as: "settings"
        },
        {
          model: models.FE_ScrumsList,
          as: "lists",
          include: [
            {
              model: models.FE_ScrumsListsAction,
              as: "action",
            },
            {
              model: models.PB_Playbook,
              as:"cards"
            }
          ],
          order: [
            [{model: models.FE_ScrumsList, as: 'lists'},'order', 'ASC']
          ]
        },
        {
          model: models.MS_Member,
          as: "members"
        }
      ]
    });
    return res.status(200).json( scrums );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllPlaybooks = async (req, res) => {
  try {
    const playbooks = await models.PB_Playbook.findAll({
      include: [
        {
          model:models.SM_Survey,
          as: "surveys"
        }
      ]
    });

    return res.status(200).json({ playbooks })

  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const getAllMembers = async (req, res) => {
  try {
    const members = await models.MS_Member.findAll({
      include: [
        {
          model:models.PB_Playbook,
          as: "playbooks"
        }
      ]
  });

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
    /*
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
      */


    return res.status(200).json({ surveys });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllSurveyByType = async (req, res) => {
  try {
    const { surveyType } = req.params;
    const surveys = await models.SM_Survey.findAll(/*{
      where: { surveyType: surveyType },
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
    }*/);
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
            },
            {
              model: models.MS_Member,
              as:"members"
            },

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

const getScrumById = async (req,res) => {
  try {
    const { scrumId } = req.params;
    const scrums = await models.FE_Scrum.findOne({
      where: { id: scrumId },
      order: [['order', 'ASC']],
      include: [
        {
          model: models.FE_ScrumsSetting,
          as: "settings"
        },
        {
          model: models.FE_ScrumsList,
          as: "lists",
          include: [
            {
              model: models.FE_ScrumsListsAction,
              as: "action",
            },
            {
              model: models.PB_Playbook,
              as:"cards"
            }
          ],
          order: [
            [{model: models.FE_ScrumsList, as: 'lists'},'order', 'ASC']
          ]
        },
        {
          model: models.MS_Member,
          as: "members"
        }
      ]
    });
    return res.status(200).json( scrums );
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

/*
const getScrumById = async (req, res) => {
  try {
    const { scrumId } = req.params;
    const scrum = await models.FE_Scrum.findOne({
      where: { id: scrumId },
      include: [
        {
          model: models.FE_ScrumsSetting,
          as: "settings"
        },
        {
          model: models.FE_ScrumsList,
          as: "lists",
          include: [
            {
              model: models.FE_ScrumsListsAction,
              as: "action",
            }
          ]
        },
        {
          model: models.MS_Member,
          as: "members"
        }
      ]
    });
    console.log("SCRUM");
    if (scrum) {
      return res.status(200).json( scrum );
    }
    return res.status(404).send("This member doesn't have scrums");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
*/

const getAllScrumsByMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const scrum = await models.FE_Scrum.findOne({
      include: [
        {
          model: models.FE_ScrumsSetting,
          as: "settings"
        },
        {
          model: models.FE_ScrumsList,
          as: "lists"
        }/*,
        {
          model: models.MS_Member,
          as: "members",
          where: { id: memberId }
        }*/
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

function who() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡');
    }, 200);
  });
}

function what() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('lurks');
    }, 300);
  });
}

function where() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('in the shadows');
    }, 500);
  });
}

async function msg(req,res) {
  const a = await getAllSurvey();
  //const b = await what();
  //const c = await where();

  console.log(`${ a } ${ b } ${ c }`);

}

const getAllTest = async (req,res) => {
  try {
    var option = await models.MS_Member.findAll({
    }).then(members => {
      var m = Object.assign({},members);
      m[0]["options"]={};
      /*
      for (member in m) {
          console.log(m[member].id);
          m[member]["option"]={};
      }*/
      console.log("OUTPUT TEST (M)" + JSON.stringify(m));
      return res.status(200).json({ m });
    })

  } catch (error) {
    return res.status(500).send(error.message);
  }
};
/*
const getAllTest = async (req,res) => {
  try {
    var option = await models.MS_Member.findAll({
    }).then(members => {
      console.log("OUTPUT TEST" + JSON.stringify(members));
      members["test"]="Got it";

      var m = Object.assign({},members);
      m.test="Got  it";
      console.log("OUTPUT TEST (M)" + JSON.stringify(m));
      return res.status(200).json({ m });
    })

  } catch (error) {
    return res.status(500).send(error.message);
  }
};
*/

const getAllSurveyQuestionsOptions = async (req, res) => {
  try {
    const option = await models.SM_SurveySectionQuestionOption.findAll({
    });
    return res.status(200).json({ option });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createPlaybook = async (req, res) => {
  try {
    var  pb=req.body;
    pb["typeTask"]="PLAYBOOK";
    pb["status"]="BUILDING_INFO";
    pb["templateName"]="";
    pb["fileName"]="";
    pb["context"]={}
    pb["context"]["name"]=req.body.name;
    pb["context"]["status"]="BUILDING_INFO";
    pb["context"]["dueDate"]="";
    //pb["surveys"]=new Object();
    //pb["answers"]=new Object();
    //let post = await models.PB_Playbook.create(pb);
    //pb["answers"] = [];
    pb["surveys"] = await models['SM_Survey'].findAll({
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

    console.log("------------ BEGIN SURVEY -------------------");



    var risposte={};
    for (survey in pb["surveys"]) {
      var ID=pb.surveys[survey].id;
      risposte[ID]={};
      for (section in pb.surveys[survey].sections) {
        var sectionCode=pb.surveys[survey].sections[section].code.toString();

        risposte[ID][sectionCode]={};
        //risposte[pb.surveys[survey].id][pb.surveys[survey].sections[section].code]={}
        for (question in pb.surveys[survey].sections[section].questions) {
          var QUESTION_ID=pb.surveys[survey].sections[section].questions[question].id;
          var QUESTION_CODE=pb.surveys[survey].sections[section].questions[question].code;
          risposte[ID][sectionCode][QUESTION_CODE]={};
          risposte[ID][sectionCode][QUESTION_CODE]["questionId"]=QUESTION_ID;
          risposte[ID][sectionCode][QUESTION_CODE]["value"]="";
        }
      }

    }
    console.log(risposte);
    pb["context"]["answers"]=risposte;
    console.log("------------ END SURVEY -------------------");


    let post = await models.PB_Playbook.create(pb);

    var cardList={
      "idPlaybook":post.id,
      "idList":"0001"
    }

    let ins = await models.FE_CardsList.create(cardList);

    return res.status(201).json(
      pb
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
  getAllScrumsByMember,
  getScrumById,
  getAllSurveyByType,
  createPlaybook,
  getAllTest,
  msg,
  getDynamicOptions,
  putTest
};
