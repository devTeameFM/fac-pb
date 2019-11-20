const models = require("../database/models");

async function f(table) {
  let result = models[table].findAll();
  return result
}

const test = async (req, res) => {
    const tableName= req.params.tableName;
    const output = await f(tableName);
    return res.status(200).json({ output });
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

const getAllServices = async (req, res) => {
  try {
    const services = await models.PB_Service.findAll({
      include: [
        {
          model: models.PB_ServiceSlaResponseType,
        },
        {
          model: models.PB_ServiceRequirement,
        },
        {
          model: models.PB_ServiceAssetComponent,
        },
        {
          model: models.PB_ServiceSlaKPI,
        },
        {
          model: models.PB_ServiceSlaPenalty,
        }
      ]
    });
    return res.status(200).json( services );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getServiceResponseType= async (req, res) => {
  try {
    const responseType = await models.PB_ServiceResponseType.findAll({
      include: [
        {
          model: models.PB_ServiceSlaResponseType,
        },
        {
          model: models.PB_ServiceKPI,
        },
      ]
    });
    return res.status(200).json( responseType );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getServiceLevelAgreement= async (req, res) => {
  try {
    const responseType = await models.PB_ServiceLevelAgreement.findAll({
      include: [
        {
          model: models.PB_ServiceSlaPenalty,
        },
        {
          model: models.PB_ServiceSlaResponseType,
        },
        {
          model: models.PB_PMSlaProcedure,
        },
      ]
    });
    return res.status(200).json( responseType );
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
              as: "actions",
            },
            {
              model: models.PB_Playbook,
              as:"cards"
            },

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

function answerValueFromQuestionId(answers,questionId) {
  value="";
  for (a in answers) {
    if (answers[a].questionId===questionId) value=answers[a].value
  }
  return value
}

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
    obj["status"]="BUILDING_INFO";
    obj["dueDate"]="";
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
    obj["answers"] = {}
    obj["answers"][contractId] = {}
    dbAnswers=await models['SM_SurveyAnswer'].findAll({
      where: {
        playBookId: playbook.id
      }
    });
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
        obj["answers"][contractId][temp_section.code]={}
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
          obj["answers"][contractId][temp_section.code][temp_question.code]={
            "questionId" : temp_question.id,
            "value" : answerValueFromQuestionId(dbAnswers,temp_question.id)
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

    pb["coverImg"]="";
    pb["typeTask"]="PLAYBOOK";
    pb["status"]="BUILDING_INFO";
    pb["templateName"]="";
    pb["fileName"]="";
    pb["context"]={}
    pb["context"]["name"]=req.body.name;
    pb["context"]["status"]="BUILDING_INFO";
    pb["context"]["dueDate"]="";
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
    var playb={
      "id" : post.id,
      "taskId" : post.id
    }
    const [updated] = await models.PB_Playbook.update(playb, {
      where: { id: post.id }
    });

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
            if (surveys[survey].sections[section].questions[question].type === "TABLE") {

            }
            if (surveys[survey].sections[section].questions[question].type === "SELECT") {
                if (surveys[survey].sections[section].questions[question].tableInput.length>0) {
                  console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
                  var tableQuery=surveys[survey].sections[section].questions[question].tableInput;
                  var fieldInput=surveys[survey].sections[section].questions[question].valueInput;
                  let options = await models[tableQuery].findAll({});

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
    let ins = await models.FE_CardsList.create(cardList);

    console.log("------------ BEGIN SURVEY -------------------");
    var risposte={};
    for (survey in pb["surveys"]) {
      var ID=pb.surveys[survey].id;
      risposte[ID]={};
      for (section in pb.surveys[survey].sections) {
        var sectionCode=pb.surveys[survey].sections[section].code.toString();
        risposte[ID][sectionCode]={};
        for (question in pb.surveys[survey].sections[section].questions) {
          var QUESTION_ID=pb.surveys[survey].sections[section].questions[question].id;
          var QUESTION_CODE=pb.surveys[survey].sections[section].questions[question].code;
          var answer={
            "playBookId" : post.id,
            "questionId" : QUESTION_ID,
            "value": ""
          }
          //pb.surveys[survey].sections[section].questions[question].updated=false;

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
      post.id
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createPlaybookWithSurvey = async (req, res) => {
  try {
    var  pb=req.body;


    pb["coverImg"]="";
    pb["typeTask"]="PLAYBOOK";
    pb["status"]="BUILDING_INFO";
    pb["templateName"]="";
    pb["fileName"]="";
    pb["context"]={}
    pb["context"]["name"]=req.body.name;
    pb["context"]["status"]="BUILDING_INFO";
    pb["context"]["dueDate"]="";



    let post = await models.PB_Playbook.create(pb);


    let playBookId=post.id;
    pb["surveys"] = await models['SM_Survey'].findAll({
      where: {idPlaybook:playBookId},
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

    addSurvey(playBookId);

    //console.log("a" + a);
    //load and add survey


    var playb={
      "id" : post.id,
      "taskId" : post.id
    }


    const [updated] = await models.PB_Playbook.update(playb, {
      where: { id: post.id }
    });

    var cardList={
      "idTask":post.id,
      "idList":"0001"
    }


    pb["id"]=post.id;
    let now=new Date().toISOString().replace(/\:/g,"-");
    pb["fileName"]=req.body.name + "_" + post.id + "_" + now + ".docx";

    let surveys = await models['SM_Survey'].findAll({
        where: {idPlaybook:playBookId},
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
            if (surveys[survey].sections[section].questions[question].type === "TABLE") {

            }
            if (surveys[survey].sections[section].questions[question].type === "SELECT") {
                if (surveys[survey].sections[section].questions[question].tableInput.length>0) {
                  console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
                  var tableQuery=surveys[survey].sections[section].questions[question].tableInput;
                  var fieldInput=surveys[survey].sections[section].questions[question].valueInput;
                  let options = await models[tableQuery].findAll({});

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
    let ins = await models.FE_CardsList.create(cardList);

    console.log("------------ BEGIN SURVEY -------------------");
    var risposte={};
    for (survey in pb["surveys"]) {
      console.log("pb.surveys[survey].id --> " + pb.surveys[survey].id);
      var ID=pb.surveys[survey].id;
      risposte[ID]={};
      for (section in pb.surveys[survey].sections) {
        var sectionCode=pb.surveys[survey].sections[section].code.toString();
        risposte[ID][sectionCode]={};
        for (question in pb.surveys[survey].sections[section].questions) {
          var QUESTION_ID=pb.surveys[survey].sections[section].questions[question].id;
          var QUESTION_CODE=pb.surveys[survey].sections[section].questions[question].code;
          var answer={
            "playBookId" : post.id,
            "questionId" : QUESTION_ID,
            "value": ""
          }
          //pb.surveys[survey].sections[section].questions[question].updated=false;

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
      post.id
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePlaybooks = async (req, res) => {
  try {
    const deleted = await models.PB_Playbook.destroy({
    });
    if (deleted) {
      return res.status(204).send("Playbook deleted");
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// ***************** funzioni temporanee da sistemare per generalizzare ****************************
function updatePb(pb,questionId,updated) {
  for (sur in pb.surveys) {
    for (sec in pb.surveys[sur].sections) {
      for (q in pb.surveys[sur].sections[sec].questions) {
        if (pb.surveys[sur].sections[sec].questions[q].id==questionId) {
          pb.surveys[sur].sections[sec].questions[q]["updated"]=updated;
          console.log("AGGIORNATO --> " + pb.surveys[sur].sections[sec].questions[q].name)
        }
      }
    }
  }

  return pb
}

// ***************** funzioni temporanee da sistemare per generalizzare ****************************

function camelCode(s) {
  let listWords=s.split(" ");
  let camelType="";
  for (w in listWords) {
    if (w==0) {
      //prima lettera miniscola
      listWords[w]=listWords[w].charAt(0).toLowerCase() + listWords[w].substring(1);
    } else {
      listWords[w]=listWords[w].charAt(0).toUpperCase() + listWords[w].substring(1);
    }
    camelType+=listWords[w];
  }
  camelType = camelType.replace(/[^\w\s]/gi, '')
  return camelType;
}

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
    var answers=playbook.answers[playbook.id];
    for (a in answers) {
      for (b in answers[a]) {
        await models.SM_SurveyAnswer.update(answers[a][b], {where: { questionId: answers[a][b].questionId }});
      }
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
      for (a in answers) {
        for (b in answers[a]) {
          if (answers[a][b].questionId==parameters[p].questionId) {
            if (answers[a][b].value) console.log("answer " + answers[a][b].value)
            if (parameters[p].value) console.log("parameter " + parameters[p].value)
            if (answers[a][b].value === parameters[p].value) {
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
                  switch(answers[a][b].value) {
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



                  par2update={
                    "value" : answers[a][b].value
                  }

                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "serviceHours" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "duration" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "serviceType" :
                // verifico se esiste la question :serviceTypeDetails
                console.log("VERIFICO SE serviceTypeDetails ESISTE")
                // ******************************************************** serviceTypeDetails ***********************************/
                // serviceTypeDetails --> lista dei servizi legati alla tipologia scelta --> serviceType
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
                        //playbook.surveys[sur].sections[sec].questions[q]
                        /*result={
                          "surveyId" : playbook.surveys[sur].id,
                          "sectionId" : playbook.surveys[sur].sections[sec].code,
                          "questionId" : playbook.surveys[sur].sections[sec].questions[q].id
                        }*/
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
                let serviceType = await models['PB_ServiceClass'].findOne({where: { name: answers[a][b].value }});
                let service = await models['PB_Service'].findAll(
                  {
                    attributes: [['serviceName', 'name'],['serviceName', 'defaultValue']],
                    where: { idServiceClass: serviceType.id }
                  });

                let serviceTypeQuestion = await models['SM_SurveySectionQuestion'].findOne({where: { code: "serviceType" }});
                tableRow={
                  //"idSection" :idSection=result.sectionId,
                  "idPlaybook" : playbook.id,
                  "idSection" : serviceTypeQuestion.idSection,
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
                  "options": service,
                  "tableName" : "serviceTypeTable",
                  "tableHeader" : ""
                }
                let surSecQue0=await models.SM_SurveySectionQuestion.create(tableRow);

                for (q in service) {
                  let optionAdd={
                    "idPlaybook" : playbook.id,
                    "idQuestion" : surSecQue0.id,
                    "name" : service[q].dataValues.name,
                    "defaultValue" : service[q].dataValues.defaultValue,
                    "disabled" : false,
                    "updated" : true
                  }
                  await models.SM_SurveySectionQuestionOption.create(optionAdd);
                }
                tableRows.push([tableRow]);
                // ******************************************************** serviceTypeDetails ***********************************/

                // ******************************************************** facilityServiceCondition ***********************************/
                let checkfacilityServiceCondition=await models['SM_SurveySectionQuestion'].findOne({where: { code: "facilityServiceCondition" }})
                if (checkfacilityServiceCondition) {
                  //esiste
                  console.log("facilityIndex ESISTE");
                  //esiste
                  console.log("serviceTypeDetails ESISTE : id --> " + checkfacilityServiceCondition.id)
                  //elimino QUESTION:
                  const deleted = await models.SM_SurveySectionQuestion.destroy({ where: { id: checkfacilityServiceCondition.id }});
                  console.log("Question deleted --> " + deleted );
                  await models.SM_SurveyAnswer.destroy({ where: { questionId: checkfacilityServiceCondition.id, playBookId: playbook.id}});
                  await models.SM_SurveySectionQuestionOption.destroy({ where: { idQuestion: checkfacilityServiceCondition.id, idPlaybook: playbook.id }});
                  console.log("Option deleted --> " + deleted );
                  //console.log("playBookId --> " + pb.id );

                  if (deleted)  console.log("serviceTypeDetails DELETED")
                } else {
                  console.log("facilityIndex NON ESISTE");
                }
                let facilityIndex= await models['PB_ConditionIndex'].findAll({attributes: [['levelTypeName', 'name'],['levelTypeName', 'defaultValue']]});
                tableRow={
                  "idPlaybook" : playbook.id,
                  "idSection" : serviceTypeQuestion.idSection,
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

                let surSecQue1=await models.SM_SurveySectionQuestion.create(tableRow);

                for (q in facilityIndex) {
                  let optionAdd={
                    "idPlaybook" : playbook.id,
                    "idQuestion" : surSecQue1.id,
                    "name" : facilityIndex[q].dataValues.name,
                    "defaultValue" : facilityIndex[q].dataValues.defaultValue,
                    "disabled" : false
                  }
                  await models.SM_SurveySectionQuestionOption.create(optionAdd);
                }
                tableRows.push([tableRow]);
                /*
                let answerAdd1={
                  "playBookId" : playbook.id,
                  "questionId" : surSecQue1.id,
                  "value" : ""
                }
                let answ1=await models.SM_SurveyAnswer.create(answerAdd1);
                //playbook.context.answers.push(answ1);
                if (tableRow.isParameter) {
                  let paramAdd1={
                    "playBookId" : playbook.id,
                    "questionId" : surSecQue1.id,
                    "value" : ""
                  }
                  await models.SM_SurveyParameter.create(paramAdd1)
                }*/



                // ******************************************************** facilityServiceCondition ***********************************/
                //aggiungo le question al play book
                playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableName="serviceTypeDetails";
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
                  playbook.surveys[sur].sections[sec].questions[q].update=true;
                  tableRows=[];
                  tableHeader: ["System","Component","# of components of served area sf","Add any other useful information"]
                  let serviceAssetComponent= await models['PB_ServiceAssetComponent'].findAll({where: { serviceName: answers[a][b].value }});
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
                    //playbook.context.answers.push(answerAdded01);
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
                    //playbook.context.answers.push(answerAdded02);
                    tableRow=[serviceAssetComponent[sAC].serviceName,serviceAssetComponent[sAC].assetComponentType,question2add01,question2add02]

                    tableRows.push(tableRow);
                  }

                  playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableHeader=tableHeader;
                  playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableRows=tableRows;
                  console.log('\x1b[33m');
                  console.log("tableRows:" + JSON.stringify(tableRows,null,2));
                  console.log('\x1b[0m');
                  par2update={
                    "value" : answers[a][b].value,
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "facilityServiceCondition" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "serviceLevel" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "preventiveMaintenance" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "correctiveActivities" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "serviceRequest" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
                case "onSiteTeam" :
                  par2update={
                    "value" : answers[a][b].value
                  }
                  await models.SM_SurveyParameter.update(par2update, {
                    where: { questionId:answers[a][b].questionId }
                  });
                  break;
              }
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

const cleandDB = async (req,res) => {
  try {

    await models.SM_SurveySectionQuestion.destroy({
        where: {},
        truncate: true })
    await models.SM_SurveyAnswer.destroy({
      where: {},
      truncate: true });
    await models.SM_SurveySection.destroy({
        where: {},
        truncate: true });
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
    let surveyModel=require("../tracciati/survey-backend.json");
    for (survey in surveyModel) {
      var surveyEntity={
        //"id" : surveyModel[survey].id,
        "name" : surveyModel[survey].name,
        "code" : camelCode(surveyModel[survey].name),
        "nextStatus" : surveyModel[survey].nextStatus,
        "imageURL" : surveyModel[survey].imageURL,
        "surveyType" : "PLAYBOOK",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      }
      let sur=await models.SM_Survey.create(surveyEntity);
      console.log('\x1b[33m');
      console.log("surveyEntity " + JSON.stringify(surveyEntity,null,2));
      console.log('\x1b[0m');
      for (section in surveyModel[survey].sections) {
        var surveySectionEntity={
          //"id" : surveyModel[survey].sections[section].id,
          "idSurvey" : sur.id,
          "name" :  surveyModel[survey].sections[section].name,
          "code" : camelCode(surveyModel[survey].sections[section].name),
          "tooltip" : surveyModel[survey].sections[section].tooltip,
          "nameI18n" : surveyModel[survey].sections[section].nameI18n,
          "imageURL" : surveyModel[survey].sections[section].imageURL,
          "createdAt" : new Date(),
          "updatedAt" : new Date()
        }
        let surSec=await models.SM_SurveySection.create(surveySectionEntity);
        console.log('\x1b[36m');
        console.log("surveySectionEntity " + JSON.stringify(surveySectionEntity,null,2));
        console.log('\x1b[0m');
        for (question in surveyModel[survey].sections[section].questions) {
          if (surveyModel[survey].sections[section].questions[question].type=="TABLE") {
            var surveySectionQuestionEntity={
              //"id" : surveyModel[survey].sections[section].questions[question].id,
              "idSection" : surSec.id,
              "code" : camelCode(surveyModel[survey].sections[section].questions[question].name),
              "name" : surveyModel[survey].sections[section].questions[question].name,
              "tooltip" : surveyModel[survey].sections[section].questions[question].tooltip,
              "nameI98n" : surveyModel[survey].sections[section].questions[question].nameI98n,
              "type" : surveyModel[survey].sections[section].questions[question].type,
              "icon" : surveyModel[survey].sections[section].questions[question].icon,
              "required" : surveyModel[survey].sections[section].questions[question].required,
              "flow" : surveyModel[survey].sections[section].questions[question].flow,
              "tableInput" : "",
              "valueInput" : "",
            }
            if (surveyModel[survey].sections[section].questions[question].tableHeader) {
              var tableHeader = surveyModel[survey].sections[section].questions[question].tableHeader.toString();
              var tableRows = surveyModel[survey].sections[section].questions[question].tableRows.toString();
            }
            surveySectionQuestionEntity["tableHeader"]=tableHeader;
            surveySectionQuestionEntity["tableRows"]=tableRows;
            console.log('\x1b[34m');
          } else {
            var isParameter=false;
            var tableInput="";
            var valueInput="";
            if (surveyModel[survey].sections[section].questions[question].tableInput) {
              tableInput=surveyModel[survey].sections[section].questions[question].tableInput;
            }
            if (surveyModel[survey].sections[section].questions[question].valueInput) {
              valueInput=surveyModel[survey].sections[section].questions[question].valueInput;
            }
            if (surveyModel[survey].sections[section].questions[question].isParameter) {
              isParameter=true;
            }
            var surveySectionQuestionEntity={
              //"id" : surveyModel[survey].sections[section].questions[question].id,
              "idSection" : surSec.id,
              "code" : camelCode(surveyModel[survey].sections[section].questions[question].name),
              "name" : surveyModel[survey].sections[section].questions[question].name,
              "tooltip" : surveyModel[survey].sections[section].questions[question].tooltip,
              "nameI98n" : surveyModel[survey].sections[section].questions[question].nameI98n,
              "type" : surveyModel[survey].sections[section].questions[question].type,
              "icon" : surveyModel[survey].sections[section].questions[question].icon,
              "required" : surveyModel[survey].sections[section].questions[question].required,
              "flow" : surveyModel[survey].sections[section].questions[question].flow,
              "tableInput" : tableInput,
              "valueInput" : valueInput,
              "isParameter" : isParameter
            }
            console.log('\x1b[32m');
        }
        let surSecQue=await models.SM_SurveySectionQuestion.create(surveySectionQuestionEntity);

        // insert SM_SurveyParameters
        if (surveySectionQuestionEntity.isParameter) {
          var surveyParameter={
            "questionId" : surSecQue.id,
            "value" : "",
            "name" : surveySectionQuestionEntity.code
          }
          let surParam=await models.SM_SurveyParameter.create(surveyParameter);
        }

        console.log("surveySectionQuestionEntity " + JSON.stringify(surveySectionQuestionEntity,null,2));
        console.log('\x1b[0m');
        }
      }

    }
    return res.status(200).json({});
}

const addSurvey = async (playBookId) => {
    let surveyModel=require("../tracciati/survey-backend.json");
    //let playBookId= req.params.playBookId;
    for (survey in surveyModel) {
      var surveyEntity={
        //"id" : surveyModel[survey].id,
        "idPlaybook" : playBookId,
        "name" : surveyModel[survey].name,
        "code" : camelCode(surveyModel[survey].name),
        "nextStatus" : surveyModel[survey].nextStatus,
        "imageURL" : surveyModel[survey].imageURL,
        "surveyType" : "PLAYBOOK",
        "createdAt" : new Date(),
        "updatedAt" : new Date()
      }
      let sur=await models.SM_Survey.create(surveyEntity);
      console.log('\x1b[33m');
      console.log("surveyEntity " + JSON.stringify(surveyEntity,null,2));
      console.log('\x1b[0m');
      for (section in surveyModel[survey].sections) {
        var surveySectionEntity={
          //"id" : surveyModel[survey].sections[section].id,
          "idPlaybook" : playBookId,
          "idSurvey" : sur.id,
          "name" :  surveyModel[survey].sections[section].name,
          "code" : camelCode(surveyModel[survey].sections[section].name),
          "tooltip" : surveyModel[survey].sections[section].tooltip,
          "nameI18n" : surveyModel[survey].sections[section].nameI18n,
          "imageURL" : surveyModel[survey].sections[section].imageURL,
          "createdAt" : new Date(),
          "updatedAt" : new Date()
        }
        let surSec=await models.SM_SurveySection.create(surveySectionEntity);
        console.log('\x1b[36m');
        console.log("surveySectionEntity " + JSON.stringify(surveySectionEntity,null,2));
        console.log('\x1b[0m');
        for (question in surveyModel[survey].sections[section].questions) {
          if (surveyModel[survey].sections[section].questions[question].type=="TABLE") {
            var surveySectionQuestionEntity={
              //"id" : surveyModel[survey].sections[section].questions[question].id,
              "idPlaybook" : playBookId,
              "idSection" : surSec.id,
              "code" : camelCode(surveyModel[survey].sections[section].questions[question].name),
              "name" : surveyModel[survey].sections[section].questions[question].name,
              "tooltip" : surveyModel[survey].sections[section].questions[question].tooltip,
              "nameI98n" : surveyModel[survey].sections[section].questions[question].nameI98n,
              "type" : surveyModel[survey].sections[section].questions[question].type,
              "icon" : surveyModel[survey].sections[section].questions[question].icon,
              "required" : surveyModel[survey].sections[section].questions[question].required,
              "flow" : surveyModel[survey].sections[section].questions[question].flow,
              "tableInput" : "",
              "valueInput" : "",
            }
            if (surveyModel[survey].sections[section].questions[question].tableHeader) {
              var tableHeader = surveyModel[survey].sections[section].questions[question].tableHeader.toString();
              var tableRows = surveyModel[survey].sections[section].questions[question].tableRows.toString();
            }
            surveySectionQuestionEntity["tableHeader"]=tableHeader;
            surveySectionQuestionEntity["tableRows"]=tableRows;
            console.log('\x1b[34m');
          } else {
            var isParameter=false;
            var tableInput="";
            var valueInput="";
            if (surveyModel[survey].sections[section].questions[question].tableInput) {
              tableInput=surveyModel[survey].sections[section].questions[question].tableInput;
            }
            if (surveyModel[survey].sections[section].questions[question].valueInput) {
              valueInput=surveyModel[survey].sections[section].questions[question].valueInput;
            }
            if (surveyModel[survey].sections[section].questions[question].isParameter) {
              isParameter=true;
            }
            var surveySectionQuestionEntity={
              //"id" : surveyModel[survey].sections[section].questions[question].id,
              "idPlaybook" : playBookId,
              "idSection" : surSec.id,
              "code" : camelCode(surveyModel[survey].sections[section].questions[question].name),
              "name" : surveyModel[survey].sections[section].questions[question].name,
              "tooltip" : surveyModel[survey].sections[section].questions[question].tooltip,
              "nameI98n" : surveyModel[survey].sections[section].questions[question].nameI98n,
              "type" : surveyModel[survey].sections[section].questions[question].type,
              "icon" : surveyModel[survey].sections[section].questions[question].icon,
              "required" : surveyModel[survey].sections[section].questions[question].required,
              "flow" : surveyModel[survey].sections[section].questions[question].flow,
              "tableInput" : tableInput,
              "valueInput" : valueInput,
              "isParameter" : isParameter
            }
            console.log('\x1b[32m');
        }
        let surSecQue=await models.SM_SurveySectionQuestion.create(surveySectionQuestionEntity);

        // insert SM_SurveyParameters
        if (surveySectionQuestionEntity.isParameter) {
          var surveyParameter={
            "playBookId" : playBookId,
            "questionId" : surSecQue.id,
            "value" : "",
            "name" : surveySectionQuestionEntity.code
          }
          let surParam=await models.SM_SurveyParameter.create(surveyParameter);
        }

        console.log("surveySectionQuestionEntity " + JSON.stringify(surveySectionQuestionEntity,null,2));
        console.log('\x1b[0m');
        }
      }

    }

    return;
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
  importQuestionsFromJSON,
  deletePlaybooks,
  test,
  getAllServices,
  getServiceResponseType,
  getServiceLevelAgreement,
  addSurvey,
  createPlaybookWithSurvey
};
