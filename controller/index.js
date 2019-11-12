const models = require("../database/models");

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
              as: "actions",
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

const getContractById = async (req, res) => {
  try {
    const contractId= req.params.contractId;
    let pb={};

    //console.log("contractId --> " + JSON.stringify(req.params));
    const playbook = await models.PB_Playbook.findOne({
      where: { id: contractId},
    });

    /*
    var obj= {
      "id" : playbook.id,
      "id" : playbook.id,
      "id" : playbook.id,
      "id" : playbook.id,
      "id" : playbook.id,
      "sections"
    }*/
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
          temp_section.questions.push(temp_question);
        }
        temp_survey.sections.push(temp_section);
      }
      obj["surveys"].push(temp_survey);
    }

    /*
    obj["context"]["answers"] = await models['SM_SurveyAnswer'].findAll({
      where: {
        playBookId: playbook.id
      }
    });*/
    return res.status(200).json(obj)

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

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


function initPlayBook(pb) {
  pb["typeTask"]="PLAYBOOK";
  pb["status"]="BUILDING_INFO";
  pb["templateName"]="";
  pb["fileName"]="";
  pb["context"]={}
  pb["context"]["name"]="req.body.name";
  pb["context"]["status"]="BUILDING_INFO";
  pb["context"]["dueDate"]="";

  return pb;
}

function sortByProperty(property){
   return function(a,b){
      if(a[property] > b[property])
         return 1;
      else if(a[property] < b[property])
         return -1;

      return 0;
   }
}

const getAllContracts= async (req, res) => {
  try {
    console.log("getAllPlaybooks");

    const playbooks = await models.PB_Playbook.findAll({
    });

    var listPlayBooks=[];
    for (contract in playbooks) {
      var obj = Object.assign({}, playbooks[contract].dataValues);
      obj=initPlayBook(obj);

      obj["surveys"] = await models['SM_Survey'].findAll({
        order: [
          [ { model: models.SM_SurveySection , as: 'sections'}, 'id', 'ASC'],
          [ { model: models.SM_SurveySection , as: 'sections'},
            { model: models.SM_SurveySectionQuestion, as: 'questions' }, 'id', 'ASC']
        ],
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
      var risposte={};
      for (survey in obj["surveys"]) {
        var ID=obj.surveys[survey].id;
        risposte[ID]={};
        for (section in obj.surveys[survey].sections) {
          var sectionCode=obj.surveys[survey].sections[section].code.toString();

          risposte[ID][sectionCode]={};
          //risposte[pb.surveys[survey].id][pb.surveys[survey].sections[section].code]={}
          for (question in obj.surveys[survey].sections[section].questions) {
            var QUESTION_ID=obj.surveys[survey].sections[section].questions[question].id;
            var QUESTION_CODE=obj.surveys[survey].sections[section].questions[question].code;
            risposte[ID][sectionCode][QUESTION_CODE]={};
            risposte[ID][sectionCode][QUESTION_CODE]["questionId"]=QUESTION_ID;
            risposte[ID][sectionCode][QUESTION_CODE]["value"]="";
          }
        }

      }*/
      obj["context"]["answers"] = await models['SM_SurveyAnswer'].findAll({
        where: {
          playBookId: playbooks[contract].id
        }
      });
      console.log("obj[context][answers] --> " + obj["context"]["answers"]);
      listPlayBooks.push(obj);
    }

    let pb={};
    pb=initPlayBook(pb);

    return res.status(201).json(
      listPlayBooks
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
              as: "actions",
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




    let post = await models.PB_Playbook.create(pb);

    var cardList={
      "idTask":post.id,
      "idList":"0001"
    }

    pb["id"]=post.id;
    let now=new Date().toISOString().replace(/\:/g,"-");
    pb["fileName"]=req.body.name + "_" + post.id + "_" + now + ".docx";

    let surveys = await models['SM_Survey'].findAll({
        include: [
          {
            model: models.SM_SurveySection,
            as: "sections",
            include: [
              {
                model: models.SM_SurveySectionQuestion,
                as: "questions"
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
                  if (surveys[survey].sections[section].questions[question].tableInput.length>0) {
                    console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
                    var tableQuery=surveys[survey].sections[section].questions[question].tableInput;
                    var fieldInput=surveys[survey].sections[section].questions[question].valueInput;
                    let options = await models[tableQuery].findAll({});
                    //console.log("options --> " + JSON.stringify(options));

                    for (o in options) {
                      var option={
                        "idPlaybook" : post.id,
                        "idQuestion" : surveys[survey].sections[section].questions[question].id,
                        "name" : options[o][fieldInput],
                        "defaultValue" : options[o][fieldInput],
                        "disabled" : false,
                        "createdAt" : new Date(),
                        "updatedAt" : new Date()
                      }
                      console.log(option);
                      await models.SM_SurveySectionQuestionOption.create(option);
                    }
                  }
                } else {
                  var option={
                    "idPlaybook" : post.id,
                    "idQuestion" : surveys[survey].sections[section].questions[question].id,
                    "name" : "",
                    "defaultValue" : "",
                    "disabled" : false,
                    "createdAt" : new Date(),
                    "updatedAt" : new Date()
                  }
                  console.log(option);
                  await models.SM_SurveySectionQuestionOption.create(option);
              }
            }
  	       }
         }
    // test



    let ins = await models.FE_CardsList.create(cardList);

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
          var answer={
            "playBookId" : post.id,
            "questionId" : QUESTION_ID,
            "value": ""
          }
          let a = await models.SM_SurveyAnswer.create(answer);
          risposte[ID][sectionCode][QUESTION_CODE]={};
          risposte[ID][sectionCode][QUESTION_CODE]["questionId"]=QUESTION_ID;
          risposte[ID][sectionCode][QUESTION_CODE]["value"]="";
        }
      }

    }
    console.log(risposte);
    pb["context"]["answers"]=risposte;
    console.log("------------ END SURVEY -------------------");



    return res.status(201).json(
      pb
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateContract = async (req, res) => {
  try {
    const  playbook  = req.body;
    console.log(playbook.id);
    const { playbookId } = playbook.id;
    //UPDATE status
    var pb={
      "id" : playbook.id,
      "status" : playbook.status
    }
    const [updated] = await models.PB_Playbook.update(pb, {
      where: { id: pb.id }
    });
    //UPDATE answers
    var answers=playbook.context.answers;
    console.log(JSON.stringify(answers));
    for (answer in answers) {
      const [updated] = await models.SM_SurveyAnswer.update(answers[answer], {
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
      where: { idPlaybook: pb.id}
    });



    return res.status(200).json( playbook );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const cleandDB = async (req,res) => {
  try {

    /*await models.SM_SurveySectionQuestion.destroy({
        where: {},
        truncate: true })*/
    /*await models.SM_SurveyAnswer.destroy({
      where: {},
      truncate: true });*/
    /*await models.SM_SurveySection.destroy({
        where: {},
        truncate: true });*/
    await models.PB_Playbook.destroy({
      where: {},
      truncate: true });
    await models.SM_SurveySectionQuestionOption.destroy({
        where: {},
        truncate: true })
    await models.FE_CardsList.destroy({
        where: {},
        truncate: true });
    await models.SM_Survey.destroy({
        where: {}});


    return res.status(200).json({ });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const generateQuestions = async (req,res) => {
  try {
    let surveys = await models['SM_Survey'].findAll({
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections",
          include: [
            {
              model: models.SM_SurveySectionQuestion,
              as: "questions"
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
              if (surveys[survey].sections[section].questions[question].tableInput.length>0) {
                console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
                var tableQuery=surveys[survey].sections[section].questions[question].tableInput;
                var fieldInput=surveys[survey].sections[section].questions[question].valueInput;
                let options = await models[tableQuery].findAll({});
                //console.log("options --> " + JSON.stringify(options));

                for (o in options) {
                  var option={
                    "idQuestion" : surveys[survey].sections[section].questions[question].id,
                    "name" : options[o][fieldInput],
                    "defaultValue" : options[o][fieldInput],
                    "disabled" : false,
                    "createdAt" : new Date(),
                    "updatedAt" : new Date()
                  }
                  console.log(option);
                  await models.SM_SurveySectionQuestionOption.create(option);
                }
            }
            }
          }
	       }
       }

    //console.log("Surveys --> " + JSON.stringify(surveys));
    return res.status(200).json({ });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const importQuestionsFromJSON = async (req,res) => {
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
          console.log("section name : " + surveySectionQuestionEntity.id);
          console.log("section name : " + surveySectionQuestionEntity.name);
          let surSecQue=await models.SM_SurveySectionQuestion.create(surveySectionQuestionEntity);
        }
      }

    }

    return res.status(200).json(surveyModel);
}


module.exports = {
  getDynamicOptions,
  getAllScrums,
  getContractById,
  getAllContracts,
  getAllMembers,
  getAllSurveyDynamics,
  getAllSurveyByType,
  getAllSurvey,
  getSurveyById,
  getScrumById,
  getAllScrumsByMember,
  createPlaybook,
  updateContract,
  getContractById,
  cleandDB,
  generateQuestions,
  importQuestionsFromJSON
};
