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

const importQuestionsFromJSON_original = async (req,res) => {
    let surveyModel=require("../tracciati/survey.json");
    for (survey in surveyModel) {
      var surveyEntity={
        //"id" : surveyModel[survey].id,
        "name" : surveyModel[survey].name,
        "code" : surveyModel[survey].code,
        "nextStatus" : surveyModel[survey].nextStatus,
        "imageURL" : surveyModel[survey].imageURL,
        "surveyType" : "PLAYBOOK",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      }
      let sur=await models.SM_Survey.create(surveyEntity);
      console.log("survey id " + sur.id);
      for (section in surveyModel[survey].sections) {
        var surveySectionEntity={
          //"id" : surveyModel[survey].sections[section].id,
          "idSurvey" : sur.id,
          "name" :  surveyModel[survey].sections[section].name,
          "code" : surveyModel[survey].sections[section].code,
          "tooltip" : surveyModel[survey].sections[section].tooltip,
          "nameI18n" : surveyModel[survey].sections[section].nameI18n,
          "imageURL" : surveyModel[survey].sections[section].imageURL,
          "createdAt" : new Date(),
          "updatedAt" : new Date()
        }

        let surSec=await models.SM_SurveySection.create(surveySectionEntity);
        for (question in surveyModel[survey].sections[section].questions) {
          if (surveyModel[survey].sections[section].questions[question].type=="TABLE") {
            if (surveyModel[survey].sections[section].questions[question].tableRows) {
              console.log("**********************************" + surveyModel[survey].sections[section].questions[question].tableHeader);
            }
            if (surveyModel[survey].sections[section].questions[question].condition) {
              console.log("**********************************" + JSON.stringify(surveyModel[survey].sections[section].questions[question].condition.tables));
            }
          } else {
            var surveySectionQuestionEntity={
              //"id" : surveyModel[survey].sections[section].questions[question].id,
              "idSection" : surSec.id,
              "code" : surveyModel[survey].sections[section].questions[question].code,
              "name" : surveyModel[survey].sections[section].questions[question].name,
              "tooltip" : surveyModel[survey].sections[section].questions[question].tooltip,
              "nameI98n" : surveyModel[survey].sections[section].questions[question].nameI98n,
              "type" : surveyModel[survey].sections[section].questions[question].type,
              "icon" : surveyModel[survey].sections[section].questions[question].icon,
              "required" : surveyModel[survey].sections[section].questions[question].required,
              "flow" : surveyModel[survey].sections[section].questions[question].flow,
              "tableInput" : "",
              "valueInput" : ""
            }
        }
        let surSecQue=await models.SM_SurveySectionQuestion.create(surveySectionQuestionEntity);
        }
      }

    }

    return res.status(200).json(surveyModel);
}

const getContractByIdOriginal = async (req, res) => {
  try {
    const contractId= req.params.contractId;
    let pb={};

    //console.log("contractId --> " + JSON.stringify(req.params));
    const playbook = await models.PB_Playbook.findOne({
      where: { id: contractId},
    });

    var obj = Object.assign({}, playbook.dataValues);
    obj["templateName"]="";
    obj["fileName"]="";
    obj["context"]={}
    obj["context"]["name"]=playbook.name;
    obj["context"]["status"]="BUILDING_INFO";
    obj["context"]["dueDate"]="";
    obj["surveys"] = await models['SM_Survey'].findAll({
      order: [
        [ { model: models.SM_SurveySection , as: 'sections'}, 'id', 'ASC'],
        [ { model: models.SM_SurveySection , as: 'sections'}, { model: models.SM_SurveySectionQuestion, as: 'questions' }, 'id', 'ASC'],
        [ { model: models.SM_SurveySection , as: 'sections'}, { model: models.SM_SurveySectionQuestion, as: 'questions' },{ model: models.SM_SurveySectionQuestionOption, as: 'options' }, 'id', 'ASC']
      ],
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections",
          include: [
            {
              model: models.SM_SurveySectionQuestion,
              as: "questions" ,
              include: [
                {
                  where: {'idPlaybook': contractId},
                  model: models.SM_SurveySectionQuestionOption,
                  as: "options"
                }
              ]
            }
          ]
        }
      ]
    });


    obj["context"]["answers"] = await models['SM_SurveyAnswer'].findAll({
      where: {
        playBookId: playbook.id
      }
    });
    return res.status(200).json(obj)

  } catch (error) {
    return res.status(500).send(error.message);
  }
};


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

const updateContract = async (req, res) => {
  try {
    let  playbook  = req.body;
    let tableRows=[];
    let tableHeader=[];
    let tableRow;

    //UPDATE status
    var pb={
      "id" : playbook.id,
      "status" : playbook.status
    }
    const [updated] = await models.PB_Playbook.update(pb, {
      where: { id: pb.id }
    });

    var quest={
      "updated" : false
    }
    await models.SM_SurveySectionQuestion.update(quest, {
      where: { createdAt: null }
    });
    //UPDATE status

    //UPDATE answers
    var answers=playbook.context.answers;

    for (answer in answers) {
      const updated= await models.SM_SurveyAnswer.update(answers[answer], {
        where: { id: answers[answer].id }
      });
    }

    //UPDATE CARD Status
    let listCard = await models.FE_ScrumsList.findOne({
      where: { status: playbook.status }
    });
    console.log("listCard" + JSON.stringify(listCard));
    let idList=listCard.id;
    var card={
      "idList": idList
    }
    let ins = await models.FE_CardsList.update(card, {
      where: { idTask: pb.id}
    });
    //UPDATE CARD Status

    // -- comapre answers
    let parameters = await models['SM_SurveyParameter'].findAll({});
    for (p in parameters) {
      for (answer in answers) {
        if (answers[answer].questionId==parameters[p].questionId) {
          if (answers[answer].value) console.log("answer " + answers[answer].value)
          if (parameters[p].value) console.log("parameter " + parameters[p].value)
          if (answers[answer].value === parameters[p].value) {
            //console.log("no changes")
          } else {
            //cerco question code:
            let question = await models['SM_SurveySectionQuestion'].findOne({where: { id: parameters[p].questionId }});
            console.log("change on question code : " + question.code);
            console.log("change on question name : " + question.name);
            let result;
            let par2update={};

            switch(question.code) {
              case "building":
                switch(answers[answer].value) {
                  // da togliere la cablatura a codice
                  case "51 Melcher St":
                    //UPDATE cover
                    var pb={
                      "id" : playbook.id,
                      "coverImg" : "facility/fort-point-office-space-15.jpg"
                    }
                    break;
                  case "625 Massachusetts Ave":
                    //UPDATE cover
                    var pb={
                      "id" : playbook.id,
                      "coverImg" : "facility/WEBSITE-IMAGE-1.jpg"
                    }
                    break;
                }
                const [updated] = await models.PB_Playbook.update(pb, {
                  where: { id: playbook.id }
                });

                console.log('\x1b[33m');
                console.log("answers[answer].questionId " + JSON.stringify(answers[answer].questionId,null,2));
                console.log('\x1b[0m');

                par2update={
                  "value" : answers[answer].value
                }
                console.log('\x1b[33m');
                console.log("par2update " + JSON.stringify(par2update,null,2));
                console.log('\x1b[0m');
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "serviceHours" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "duration" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "serviceType" :
              // verifico se esiste la question :serviceTypeDetails
              console.log("VERIFICO SE serviceTypeDetails ESISTE")
              let checkServiceType=await models['SM_SurveySectionQuestion'].findOne({where: { code: "serviceTypeDetails" }})
              if (checkServiceType) {
                //esiste
                console.log("serviceTypeDetails ESISTE : id --> " + checkServiceType.id)
                //elimino QUESTION:
                const deleted = await models.SM_SurveySectionQuestion.destroy({ where: { id: checkServiceType.id }});
                console.log("Question deleted --> " + deleted );
                await models.SM_SurveyAnswer.destroy({ where: { questionId: checkServiceType.id, playBookId: playbook.id}});
                await models.SM_SurveySectionQuestionOption.destroy({ where: { idQuestion: checkServiceType.id, idPlaybook: playbook.id }});
                console.log("Option deleted --> " + deleted );
                //console.log("playBookId --> " + pb.id );

                if (deleted)  console.log("serviceTypeDetails DELETED")
                //elimina sia la question che option che answers
              } else {
                console.log("serviceTypeDetails NON ESISTE")
              }

              for (sur in playbook.surveys) {
                for (sec in playbook.surveys[sur].sections) {
                  for (q in playbook.surveys[sur].sections[sec].questions) {
                    if (playbook.surveys[sur].sections[sec].questions[q].code==="serviceTypeTable") {
                      playbook.surveys[sur].sections[sec].questions[q]
                      result={
                        "surveyId" : sur,
                        "sectionId" : sec,
                        "questionId" : q
                      }
                    }
                  }
                }
              }
              console.log("RESULT : " + result);
              //
              tableRows=[];
              tableHeader=["Select the service that must be provided","Select the average facility condition of your physical assets"];
              //
              let serviceType = await models['PB_ServiceClass'].findOne({where: { name: answers[answer].value }});
              let service = await models['PB_Service'].findAll(
                {
                  attributes: [['serviceName', 'name'],['serviceName', 'defaultValue']],
                  where: { idServiceClass: serviceType.id }
                }
              );

              tableRow={
                "code": "serviceTypeDetails",
                "name": "Service Type Details",
                "tooltip": "Select the systems that must be provided",
                "nameI98n": "",
                "tooltipI18n": "",
                "type": "SELECT",
                "flow": true,
                "required": true,
                "isParameter" : true,
                "updated" : true,
                "options": service
              }
              // aggiunge le question alla sectionID

              tableRow.idSection=result.sectionId;
              let surSecQue0=await models.SM_SurveySectionQuestion.create(tableRow);
              let answerAdd0={
                "playBookId" : playbook.id,
                "questionId" : surSecQue0.id,
                "value" : ""
              }
              let answ0=await models.SM_SurveyAnswer.create(answerAdd0);
              playbook.context.answers.push(answ0);
              if (tableRow.isParameter) {
                let paramAdd0={
                  "playBookId" : playbook.id,
                  "questionId" : surSecQue0.id,
                  "value" : ""
                }
                await models.SM_SurveyParameter.create(paramAdd0)
              }


              for (q in tableRow.options) {
                let optionAdd={
                  "idPlaybook" : playbook.id,
                  "idQuestion" : surSecQue0.id,
                  "name" : tableRow.options[q].dataValues.name,
                  "defaultValue" : tableRow.options[q].dataValues.defaultValue,
                  "disabled" : false
                }
                await models.SM_SurveySectionQuestionOption.create(optionAdd);
              }

              tableRows.push(tableRow);

              let checkfacilityServiceCondition=await models['SM_SurveySectionQuestion'].findOne({where: { code: "facilityServiceCondition" }})
              if (checkfacilityServiceCondition) {
                //esiste
                console.log("facilityIndex ESISTE");
                let facilityIndex= await models['PB_ConditionIndex'].findAll({attributes: [['levelTypeName', 'name'],['levelTypeName', 'defaultValue']]});
                tableRow={
                  "code": "facilityServiceCondition",
  								"name": "Facility Condition value",
  								"tooltip": "Select the average facility condition of your physical assets",
  								"nameI98n": "",
  								"tooltipI18n": "",
  								"icon": "signal_cellular_alt",
  								"type": "SELECT",
  								"flow": true,
  								"required": true,
  								"defaultValue": "",
                  "isParameter" : true,
                  "updated" : true,
                  "options": facilityIndex
                }
                tableRow.idSection=result.sectionId;
                tableRows.push(tableRow);
                //elimina sia la question che option che answers
              } else {
                console.log("facilityIndex NON ESISTE");
                let facilityIndex= await models['PB_ConditionIndex'].findAll({attributes: [['levelTypeName', 'name'],['levelTypeName', 'defaultValue']]});
                tableRow={
                  "code": "facilityServiceCondition",
  								"name": "Facility Condition value",
  								"tooltip": "Select the average facility condition of your physical assets",
  								"nameI98n": "",
  								"tooltipI18n": "",
  								"icon": "signal_cellular_alt",
  								"type": "SELECT",
  								"flow": false,
  								"required": false,
  								"defaultValue": "",
                  "isParameter" : true,
                  "updated" : true,
                  "options": facilityIndex
                }
                tableRow.idSection=result.sectionId;
                let surSecQue1=await models.SM_SurveySectionQuestion.create(tableRow);
                let answerAdd1={
                  "playBookId" : playbook.id,
                  "questionId" : surSecQue1.id,
                  "value" : ""
                }
                let answ1=await models.SM_SurveyAnswer.create(answerAdd1);
                playbook.context.answers.push(answ1);
                if (tableRow.isParameter) {
                  let paramAdd1={
                    "playBookId" : playbook.id,
                    "questionId" : surSecQue1.id,
                    "value" : ""
                  }
                  await models.SM_SurveyParameter.create(paramAdd1)
                }
                for (q in tableRow.options) {
                  let optionAdd={
                    "idPlaybook" : playbook.id,
                    "idQuestion" : surSecQue1.id,
                    "name" : tableRow.options[q].dataValues.name,
                    "defaultValue" : tableRow.options[q].dataValues.defaultValue,
                    "disabled" : false
                  }
                  await models.SM_SurveySectionQuestionOption.create(optionAdd);
                }
                tableRows.push(tableRow);

              }

              par2update={
                "value" : answers[answer].value
              }
              await models.SM_SurveyParameter.update(par2update, {
                where: { questionId:answers[answer].questionId }
              });
              //aggiungo le question al play book
              playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableHeader=tableHeader;
              playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableRows=tableRows;
                break;
              case "serviceTypeDetails":
                for (sur in playbook.surveys) {
                  for (sec in playbook.surveys[sur].sections) {
                    for (q in playbook.surveys[sur].sections[sec].questions) {
                      if (playbook.surveys[sur].sections[sec].questions[q].code==="serviceTypeDetailsTable") {
                        playbook.surveys[sur].sections[sec].questions[q]
                        result={
                          "surveyId" : sur,
                          "sectionId" : sec,
                          "questionId" : q
                        }
                      }
                    }
                  }
                }
                tableRows=[];
                tableHeader: ["System","Component","# of components of served area sf","Add any other useful information"]
                let serviceAssetComponent= await models['PB_ServiceAssetComponent'].findAll({where: { serviceName: answers[answer].value }});
                for (sAC in serviceAssetComponent) {
                  let question2add01={
                    "code": camelCode(serviceAssetComponent[sAC].assetComponentType),
                    "name": "# of elements",
                    "tooltip": "",
                    "nameI98n": "",
                    "tooltipI18n": "",
                    "type": "STRING",
                    "flow": false,
                    "required": false,
                    "isParameter" : false,
                    "updated" : true,
                  }
                  let surquestion2add01=await models.SM_SurveySectionQuestion.create(question2add01);
                  question2add01.id=surquestion2add01.id;
                  let answer2add01={
                    "playBookId" : playbook.id,
                    "questionId" : surquestion2add01.id,
                    "value" : ""
                  }
                  let answerAdded01=await models.SM_SurveyAnswer.create(answer2add01);
                  playbook.context.answers.push(answerAdded01);
                  let question2add02={
                    "code": camelCode(serviceAssetComponent[sAC].assetComponentType) + "Notes",
                    "name": "Information or comments",
                    "tooltip": "",
                    "nameI98n": "",
                    "tooltipI18n": "",
                    "type": "STRING",
                    "flow": false,
                    "required": false,
                    "isParameter" : false,
                    "updated" : true,
                  }
                  let surquestion2add02=await models.SM_SurveySectionQuestion.create(question2add02);
                  question2add02.id=surquestion2add02.id;
                  let answer2add02={
                    "playBookId" : playbook.id,
                    "questionId" : surquestion2add02.id,
                    "value" : ""
                  }
                  let answerAdded02=await models.SM_SurveyAnswer.create(answer2add02);
                  playbook.context.answers.push(answerAdded02);
                  tableRow=[serviceAssetComponent[sAC].serviceName,serviceAssetComponent[sAC].assetComponentType,question2add01,question2add02]

                  tableRows.push(tableRow);
                }

                playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableHeader=tableHeader;
                playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableRows=tableRows;
                console.log('\x1b[33m');
                console.log("tableRows:" + JSON.stringify(tableRows,null,2));
                console.log('\x1b[0m');
                par2update={
                  "value" : answers[answer].value,
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "facilityServiceCondition" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "serviceLevel" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "preventiveMaintenance" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "correctiveActivities" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "serviceRequest" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
              case "onSiteTeam" :
                par2update={
                  "value" : answers[answer].value
                }
                await models.SM_SurveyParameter.update(par2update, {
                  where: { questionId:answers[answer].questionId }
                });
                break;
            }
          }
        }
      }
    }
    return res.status(200).json( playbook );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getContractById = async (req, res) => {
  try {
    const contractId= req.params.contractId;
    let pb={};

    //console.log("contractId --> " + JSON.stringify(req.params));
    const playbook = await models.PB_Playbook.findOne({
      where: { id: contractId},
    });

    var obj = Object.assign({}, playbook.dataValues);
    obj["templateName"]="";
    obj["fileName"]="";
    obj["context"]={}
    obj["context"]["name"]=playbook.name;
    obj["context"]["status"]="BUILDING_INFO";
    obj["context"]["dueDate"]="";
    survey = await models['SM_Survey'].findAll({
      order: [
        [ { model: models.SM_SurveySection , as: 'sections'}, 'id', 'ASC'],
        [ { model: models.SM_SurveySection , as: 'sections'}, { model: models.SM_SurveySectionQuestion, as: 'questions' }, 'id', 'ASC'],
        [ { model: models.SM_SurveySection , as: 'sections'}, { model: models.SM_SurveySectionQuestion, as: 'questions' },{ model: models.SM_SurveySectionQuestionOption, as: 'options' }, 'id', 'ASC']
      ],
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections",
          include: [
            {
              model: models.SM_SurveySectionQuestion,
              as: "questions" ,
              include: [
                {
                  where: {'idPlaybook': contractId},
                  model: models.SM_SurveySectionQuestionOption,
                  as: "options"
                }
              ]
            }
          ]
        }
      ]
    });

    obj["surveys"]=[];
    for (sur in survey) {
      var temp_survey={
        id : survey[sur].id,
        name : survey[sur].name,
        code : survey[sur].code,
        nextStatus : survey[sur].nextStatus,
        imageURL : survey[sur].imageURL,
        sections : []
      }
      for (sec in survey[sur].sections) {
        var temp_section={
          name : survey[sur].sections[sec].name,
          code : survey[sur].sections[sec].code,
          tooltip: survey[sur].sections[sec].tooltip,
          nameI98n : survey[sur].sections[sec].nameI98n,
          tooltipI18n : survey[sur].sections[sec].tooltipI18n,
          imageURL : survey[sur].sections[sec].imageURL,
          questions : []
        }
        //temp_survey.sections.push(temp_section);
        for (que in survey[sur].sections[sec].questions) {
          var temp_question={
            id : survey[sur].sections[sec].questions[que].id,
            code : survey[sur].sections[sec].questions[que].code,
            name : survey[sur].sections[sec].questions[que].name,
            tooltip : survey[sur].sections[sec].questions[que].tooltip,
            nameI98n : survey[sur].sections[sec].questions[que].nameI98n,
            tooltipI18n : survey[sur].sections[sec].questions[que].tooltipI18n,
            type : survey[sur].sections[sec].questions[que].type,
            icon : survey[sur].sections[sec].questions[que].icon,
            updated : survey[sur].sections[sec].questions[que].updated,
            required : survey[sur].sections[sec].questions[que].required,
            flow : survey[sur].sections[sec].questions[que].flow,
          }
          if (survey[sur].sections[sec].questions[que].type=="SELECT") {
            temp_question.options=[];
            for (opt in survey[sur].sections[sec].questions[que].options) {
                 var temp_option={
                   "name" : survey[sur].sections[sec].questions[que].options[opt].name,
                   "defaultValue" : survey[sur].sections[sec].questions[que].options[opt].defaultValue
                 }
                 temp_question.options.push(temp_option)
            }
          }
          if (survey[sur].sections[sec].questions[que].type=="TABLE") {
            if (temp_question.tableHeader=survey[sur].sections[sec].questions[que].tableHeader) {
              temp_question.tableHeader=survey[sur].sections[sec].questions[que].tableHeader.split(",");
              temp_question.tableRows=survey[sur].sections[sec].questions[que].tableRows.split(",");
            }
          }
          temp_section.questions.push(temp_question);
        }
        temp_survey.sections.push(temp_section);
      }
      obj["surveys"].push(temp_survey);
    }


    obj["context"]["answers"] = await models['SM_SurveyAnswer'].findAll({
      where: {
        playBookId: playbook.id
      },
      order: [
            ['questionId', 'ASC']
        ],
    });
    return res.status(200).json(obj)

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
