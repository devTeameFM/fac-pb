const models = require("../database/models");

//utils
function consoleLog(message,color) {
  /*
  Reset = "\x1b[0m"
  Bright = "\x1b[1m"
  Dim = "\x1b[2m"
  Underscore = "\x1b[4m"
  Blink = "\x1b[5m"
  Reverse = "\x1b[7m"
  Hidden = "\x1b[8m"

  FgBlack = "\x1b[30m"
  FgRed = "\x1b[31m"
  FgGreen = "\x1b[32m"
  FgYellow = "\x1b[33m"
  FgBlue = "\x1b[34m"
  FgMagenta = "\x1b[35m"
  FgCyan = "\x1b[36m"
  FgWhite = "\x1b[37m"

  BgBlack = "\x1b[40m"
  BgRed = "\x1b[41m"
  BgGreen = "\x1b[42m"
  BgYellow = "\x1b[43m"
  BgBlue = "\x1b[44m"
  BgMagenta = "\x1b[45m"
  BgCyan = "\x1b[46m"
  BgWhite = "\x1b[47m"
  */
  if (!color) color="\x1b[36m";
  console.log(color);
  console.log(JSON.stringify(message,null,2));
  console.log(color);
}
function getType(p) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
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
//playbook
function answerValueFromQuestionId(answers,questionId) {
  value="";
  for (a in answers) {
    if (answers[a].questionId===questionId) value=answers[a].value
  }
  return value
}
function addInfoTableSummary(playbook,surveyCode,sectionCode,infos) {
  var obj={};
  for (sur in playbook.surveys) {
    if (playbook.surveys[sur].code===surveyCode) {
      for (sec in playbook.surveys[sur].sections) {

          if (playbook.surveys[sur].sections[sec].code===sectionCode) {
            //consoleLog(playbook.surveys[sur].sections[sec]);
            for (q in playbook.surveys[sur].sections[sec].questions) {
              if (playbook.surveys[sur].sections[sec].questions[q].code===infos.tableName) {

                playbook.surveys[sur].sections[sec].questions[q].updated=false;
                //consoleLog(playbook.surveys[sur].sections[sec].questions[q]);
                if (playbook.surveys[sur].sections[sec].questions[q].tableHeader) {
                  //consoleLog(playbook.surveys[sur].sections[sec].questions[q]);
                  playbook.surveys[sur].sections[sec].questions[q].tableHeader=infos.tableHeader;

                } else {
                  //consoleLog(playbook.surveys[sur].sections[sec].questions[q]);
                  playbook.surveys[sur].sections[sec].questions[q]['tableHeader']=[]
                  playbook.surveys[sur].sections[sec].questions[q]['tableHeader']=infos.tableHeader;

                }
                if (playbook.surveys[sur].sections[sec].questions[q].tableRows) {
                  playbook.surveys[sur].sections[sec].questions[q]['tableRows']=infos.tableRows;
                } else {
                  playbook.surveys[sur].sections[sec].questions[q]['tableRows']=[];
                  playbook.surveys[sur].sections[sec].questions[q]['tableRows']=infos.tableRows;
                }

              }

            }
          }
        }
      }
    }
 //consoleLog(playbook)

  return playbook;
}
function getParameterValue(parameters,parameterName) {
  let value="";
  for (p in parameters) {
    if (parameters[p].name===parameterName) value= parameters[p].value;
  }
  return value;
}
const checkParameters = async () => {
  const playbooks = await models.PB_Playbook.findAll({
  });
}

const runtimeAnswerModeler = async (contractId) => {
  let surveys=await models['SM_Survey'].findAll(
    { 
      attributes : ["code"],
      where : {
        idPlaybook:contractId
      },
      include: [
        {
          attributes : ["code"],
          model: models.SM_SurveySection,
          as : "sections",
          include: [
            {
              attributes : ["code"],
              model: models.SM_SurveySectionQuestion,
              as: "questions",
              include: [
                {
                  model: models.SM_SurveyAnswer,
                  as: "answers",
                  attributes : ["questionId","value"],
                }
              ]
            }
          ]
        },
        
      ]      
    }
  )
  let answers={}
  for (a in surveys) {
    answers[surveys[a].code]={}
    //consoleLog(surveys[a]);
    for (s in surveys[a]["sections"]) {
      answers[surveys[a].code][surveys[a]["sections"][s].code]={}
      //consoleLog(surveys[a]["sections"][s]);
      for (q in surveys[a]["sections"][s]["questions"]) {
        answers[surveys[a].code][surveys[a]["sections"][s].code][surveys[a]["sections"][s]["questions"][q].code]=surveys[a]["sections"][s]["questions"][q].answers[0];
        //consoleLog(surveys[a]["sections"][s]["questions"][q]);
      }
    }
  }
  return answers;
}


const getPlayBookFromId = async (contractId) => {
  //console.log("contractId --> " + JSON.stringify(req.params));
  const playbook = await models.PB_Playbook.findOne({
    where: { id: contractId},
  });

  var obj = Object.assign({}, playbook.dataValues);
  obj["templateName"]="";
  obj["fileName"]="";

  if (playbook.status) {
    obj["status"]=playbook.status;
  } else {
    obj["status"]="BUILDING_INFO";
  }
  obj["dueDate"]="";

  

  let answersFromDB=await models['SM_SurveyAnswer'].findAll(
      {
        where : {
          playBookId:contractId
        }
      }
  )
  survey = await models['SM_Survey'].findAll({
    where: {'idPlaybook': contractId},
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
  obj["answers"]=await runtimeAnswerModeler(contractId);
  //obj["answers"][contractId]={}

  for (sur in survey) {
    // into survey
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
        var nestedSelect=[];
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
          let isParameter=false;
          if (temp_question.code === "serviceType") {
            isParameter=true;          
            temp_question.isParameter=isParameter
          }
          
          if (survey[sur].sections[sec].questions[que].tableName==null) {
            if (survey[sur].sections[sec].questions[que].type=="SELECT") {
                temp_question.options=[];
                for (opt in survey[sur].sections[sec].questions[que].options) {
                    var temp_option={
                      "name" : survey[sur].sections[sec].questions[que].options[opt].name,
                      "defaultValue" : survey[sur].sections[sec].questions[que].options[opt].defaultValue
                    }
                    //
                    if  (temp_option.name === "51 Melcher St") {
                      temp_option["hasExtendedInfo"] = {
                        "address" : "51 Melcher St",
                        "city" : "Boston",
                        "state" : "MA",
                        "zip" : "02116"
                      }
                    }
                    if  (temp_option.name === "625 Massachusetts Ave") {
                      temp_option["hasExtendedInfo"] = {
                        "address" : "625 Massachusetts Ave",
                        "city" : "Cambridge",
                        "state" : "MA",
                        "zip" : "02139"
                      }
                    }
                    //
                    temp_question.options.push(temp_option)
                }
            }
            // PROVVISORIO DA SISTEMARE
            if (survey[sur].sections[sec].questions[que].type=="TABLE") {
              if (survey[sur].sections[sec].questions[que].code=="typeOfActivities") {
                if (temp_question.tableHeader=survey[sur].sections[sec].questions[que].tableHeader) {
                  temp_question.tableHeader=survey[sur].sections[sec].questions[que].tableHeader.split(",");
                }
                let cells=survey[sur].sections[sec].questions[que].tableRows.split(",");
                rows=[]
                for (r=0;r<4;r++) {
                  row=[];
                  for (c=0;c<3;c++) {
                    if (cells[c+(r*3)].indexOf("SELECT")==-1) {
                        row.push(cells[c+(r*3)]);
                    } else {
                        var pos=cells[c+(r*3)].indexOf("SELECT");
                        var app=cells[c+(r*3)].substring(pos+7,cells[c+(r*3)].length);
                        for (nest=0;nest<nestedSelect.length;nest++) {
                          if (nestedSelect[nest].code==app) {
                              row.push(nestedSelect[nest]);
                          }
                        }
                    }
                  }
                  rows.push(row);
                }
                temp_question.tableRows=rows;
              }
              if (survey[sur].sections[sec].questions[que].code=="serviceTypeDetailsTable") {
                
                let response=await addTextFieldsToTables(contractId);
                temp_question.tableHeader=response.tableHeader;
                temp_question.tableRows=response.tableRows;
                temp_question.updated=response.updated;
                //console.log("");
              }
            }
            // PROVVISORIO DA SISTEMARE
            temp_section.questions.push(temp_question);
          } else {
            // PROVVISORIO DA SISTEMARE
            if (survey[sur].sections[sec].questions[que].tableName=="typeOfActivities") {
              nestedSelect.push(survey[sur].sections[sec].questions[que]);
            }
            if (survey[sur].sections[sec].questions[que].tableName=="serviceTypeTable") {
              addToTable(temp_section,survey[sur].sections[sec].questions[que]);
            }          
            // PROVVISORIO DA SISTEMARE
          }
        }
        temp_survey.sections.push(temp_section);
    }
    obj["surveys"].push(temp_survey);
  }
  let updatePlaybook = await runtimeSummaryCreation(obj);
  return updatePlaybook;

}
const getContractById = async (req, res) => {
  try {
    const contractId= req.params.contractId;  
    let obj=await getPlayBookFromId(contractId);
    return res.status(200).json(obj)

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const runtimeSummaryCreation = async (playBook) => {
  const parameters = await models.SM_SurveyParameter.findAll({
    attributes: ['value','name'],
    where : {
      playBookId : playBook.id
    }
  });
  // funzioni da per generare i dati nel summary
  // genericTechnicalRequirements

  let techReq=await genericTechnicalRequirements(parameters);
  let priorityDefinitionInfo=await priorityDefinition(parameters);
  let responseTimeInfo=await responseTime(parameters);
  let contractLevelResponseTimeInfo =await contractLevelResponseTime(parameters);
  let correctionTimeInfo =await correctionTime(parameters);
  let contractLevelCorrectionTimeInfo =await contractLevelCorrectionTime(parameters);
  let estimationTimeInfo =await estimationTime(parameters);
  let contractLevelEstimationTimeInfo =await contractLevelEstimationTime(parameters);
  let availabilityInfo =await availability(parameters);
  let correctionTimeForUrgencyRequestInfo =await correctionTimeForUrgencyRequest(parameters);
  let systemConditionIndexInfo =await systemConditionIndex(parameters);
  let availabilityIndexInfo =await availabilityIndex(parameters);
  let qualityProvidedInfo =await qualityProvided(parameters);
  let penaltiesRelatedMonitoringSystemInfo =await penaltiesRelatedMonitoringSystem(parameters);
  let penaltiesRelatedNonConformitiesInfo =await penaltiesRelatedNonConformities(parameters);
  let preventiveMaintenanceProceduresInfo =await preventiveMaintenanceProcedures(parameters);

  let updateplaybook=addInfoTableSummary(playBook,"review","genericTechnicalRequirements",techReq);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",priorityDefinitionInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",responseTimeInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",contractLevelResponseTimeInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",correctionTimeInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",contractLevelCorrectionTimeInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",estimationTimeInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","prioritiesAndResponseTimesDefinition",contractLevelEstimationTimeInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","keyPerformanceIndicators",availabilityInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","keyPerformanceIndicators",correctionTimeForUrgencyRequestInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","keyPerformanceIndicators",systemConditionIndexInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","keyPerformanceIndicators",availabilityIndexInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","keyPerformanceIndicators",qualityProvidedInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","penalties",penaltiesRelatedMonitoringSystemInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","penalties",penaltiesRelatedNonConformitiesInfo);
  updateplaybook=addInfoTableSummary(playBook,"review","preventiveMaintenanceProcedures",preventiveMaintenanceProceduresInfo);


  return updateplaybook;
}
const priorityDefinition = async (parameters) => {
   // service requirement
   // dipende da PB_Services
   // parametri --> serviceTypeDetails
   // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
   // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
   /*
   let p=getParameterValue(parameters,"serviceTypeDetails");
   const results = await models.PB_ServiceRequirement.findAll({
     attributes: ['serviceName','serviceRequirementDescription'],
     where : {
       serviceName : p
     }
   });*/
   let row=[]
   let rows=[]
   let header=["PRIORITY","DEFINITION"]

   row=["Emergency","Activities that, if not performed, may create an immediate risk to people’s health or may damage the building installations/equipment."];
   rows.push(row);
   row=["Urgency","Activities that, if not performed, also temporarily, may create a risk to people’s health or may damage the building installations/equipment."];
   rows.push(row);
   row=["Routine","Activities that, if not performed quickly, do not pose a risk to people's health or do not damage property, people and buildings."];
   rows.push(row);

   let response={
     tableName :"priorityDefinition",
     tableHeader :header,
     tableRows : rows
   }
   /*
   for (r in results) {
     response.tableRows.push([results[r].serviceRequirementDescription])
   }*/
   return response;
}
const responseTime = async (parameters) => {
   // service requirement
   // dipende da PB_Services
   // parametri --> serviceTypeDetails
   // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
   // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
   /*
   let p=getParameterValue(parameters,"serviceTypeDetails");
   const results = await models.PB_ServiceRequirement.findAll({
     attributes: ['serviceName','serviceRequirementDescription'],
     where : {
       serviceName : p
     }
   });*/
   let row=[]
   let rows=[]
   let header=["DEFINITION","RELATED KPI"]

   row=["Feedback regarding each activity delivered by the Provider","B.4 Compliance with the agreed Response Time "];
   rows.push(row);


   let response={
     tableName :"responseTime",
     tableHeader :header,
     tableRows : rows
   }
   /*
   for (r in results) {
     response.tableRows.push([results[r].serviceRequirementDescription])
   }*/
   return response;
}
const contractLevelResponseTime = async (parameters) => {
   // service requirement
   // dipende da PB_Services
   // parametri --> serviceTypeDetails
   // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
   // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
   /*
   let p=getParameterValue(parameters,"serviceTypeDetails");
   const results = await models.PB_ServiceRequirement.findAll({
     attributes: ['serviceName','serviceRequirementDescription'],
     where : {
       serviceName : p
     }
   });*/
   let row=[]
   let rows=[]
   let header=["PRIOTIRY","CONTRACT LEVEL","RESPONSE TIME (Working Hours)"]

   row=["Emergency","HIGH","<2 hours"];
   rows.push(row);
   row=["Urgency","HIGH","<6 hours"];
   rows.push(row);
   row=["Routine","HIGH","<12 hours"];
   rows.push(row);

   let response={
     tableName :"contractLevelResponseTime",
     tableHeader :header,
     tableRows : rows
   }
   /*
   for (r in results) {
     response.tableRows.push([results[r].serviceRequirementDescription])
   }*/
   return response;
}
const correctionTime = async (parameters) => {
   // service requirement
   // dipende da PB_Services
   // parametri --> serviceTypeDetails
   // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
   // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
   /*
   let p=getParameterValue(parameters,"serviceTypeDetails");
   const results = await models.PB_ServiceRequirement.findAll({
     attributes: ['serviceName','serviceRequirementDescription'],
     where : {
       serviceName : p
     }
   });*/
   let row=[]
   let rows=[]
   let header=["PRIOTIRY","CONTRACT LEVEL","RESPONSE TIME (Working Hours)"]

   row=["Emergency","HIGH","<2 hours"];
   rows.push(row);
   row=["Urgency","HIGH","<6 hours"];
   rows.push(row);
   row=["Routine","HIGH","<12 hours"];
   rows.push(row);

   let response={
     tableName :"correctionTime",
     tableHeader :header,
     tableRows : rows
   }
   /*
   for (r in results) {
     response.tableRows.push([results[r].serviceRequirementDescription])
   }*/
   return response;
}
const contractLevelCorrectionTime = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["URGENCY LEVEL","CONTRACT SERVICE LEVEL","CORRECTION TIME (Working hours)"]

  row=["Emergency","HIGH","< 8 hours"];
  rows.push(row);
  row=["Urgency","HIGH","< 16 hours"];
  rows.push(row);
  row=["Routine","HIGH","Proposed by the provider and approved by the client"];
  rows.push(row);

  let response={
    tableName :"contractLevelCorrectionTime",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const estimationTime = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["DEFINITION","RELATED KPI"]

  row=["Depending on the urgency level of the specific request (only for extra fee activities) the service provider should respect a predetermined time frame to deliver the budget estimation, as described below","B.9 Compliance with Budget Estimate Time Limit"];
  rows.push(row);


  let response={
    tableName :"estimationTime",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const contractLevelEstimationTime = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["PRIORITY","CONTRACT SERVICE LEVEL","ESTIMATION TIME (Working hours)"]

  row=["Emergency","HIGH","NA"];
  rows.push(row);
  row=["Urgency","HIGH","< 4 hours"];
  rows.push(row);
  row=["Routine","HIGH","< 8 hours"];
  rows.push(row);

  let response={
    tableName :"contractLevelEstimationTime",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const availability = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["",""]

  row=["DAILY WORKING HOURS","11"];
  rows.push(row);
  row=["WORKING DAYS","260"];
  rows.push(row);
  row=["TOTAL YEARLY WORKING HOURS (H/YEAR)","2860"];
  rows.push(row);

  let response={
    tableName :"availability",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const correctionTimeForUrgencyRequest = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["Urgency Level","Contract SLA","Correction Time (Hours)"]

  row=["Emergency","HIGH","8"];
  rows.push(row);
  row=["Urgency","HIGH","16"];
  rows.push(row);


  let response={
    tableName :"correctionTimeForUrgencyRequest",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const systemConditionIndex = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["Facility Condition value","No. of estimated on demand activities","DEFINITION"]

  row=["Activities/Month","5","estimation of the number of on demand/correction activities related to the system maintenance conditionthis number will be re-evaluate each months in order to increase the applicability and truthfulness of the related KPI (availability index)"];
  rows.push(row);
  row=["Activities/Year","60","*each time we have an on demand request or a corrective intervention (emergency and/or Urgency level) the system is considered non available"];
  rows.push(row);


  let response={
    tableName :"systemConditionIndex",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const availabilityIndex = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["KPI (KEY PERFORMANCE INDICATORS)","YES/NO","MEASURING PROCEDURE","MEASUREMENT METHOD","CALCULATION PROCEDURE","FREQUENCY","SLA"]

  row=["A.1 AVAILABILITY INDEX","Yes","Information System","Analysis of the information uploaded to the System","Ratio between system up time and total working hours","Monthly","89%"];
  rows.push(row);



  let response={
    tableName :"availabilityIndex",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const qualityProvided = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["KPI (KEY PERFORMANCE INDICATORS)","YES/NO","MEASURING PROCEDURE","MEASUREMENT METHOD","CALCULATION PROCEDURE","FREQUENCY","SLA"]

  row=["B.1 Cold satisfaction","Yes","Survey","Customer Survey campaign","Ratio between the sum of the scores related to the Service Level VS maximum possible score","Quarterly","90%"];
  rows.push(row);
  row=["B.2 Hot satisfaction","Yes","Information System","Feedback regarding each activity delivered by the Provider","Ratio between the score attributed to each activity carried out VS maximum possible score","Each time that a Corrective Activity is carried out","95%"];
  rows.push(row);
  row=["B.3 Compliance with the agreed Scheduled Activities Plan","Yes","Information System","Analysis of the information uploaded to the System","Number of activities completed according to Scheduled VS total activities scheduled","Quarterly","95"];
  rows.push(row);
  row=["B.4 Compliance with the agreed Response Time","Yes","Information System","Analysis of the information uploaded to the System","Number of corrective activities started within SLA VS total number of corrective activities","Quarterly","95"];
  rows.push(row);
  row=["B.5 Compliance with the agreed Correction Time","Yes","Information System","Analysis of the information uploaded to the System","Number of corrective activities completed within SLA VS total number of corrective activities","Quarterly","95"];
  rows.push(row);
  row=["B.5 Compliance with the agreed Correction Time","Yes","Information System","Analysis of the information uploaded to the System","Number of Budget Estimates delivered within SLA VS Total Number of Budget Estimate Delivered","Quarterly","95"];
  rows.push(row);





  let response={
    tableName :"qualityProvided",
    tableHeader :header,
    tableRows : rows
  }
  /*
  for (r in results) {
    response.tableRows.push([results[r].serviceRequirementDescription])
  }*/
  return response;
}
const penaltiesRelatedMonitoringSystem = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["KPI (KEY PERFORMANCE INDICATORS)","SLA","PENALTY"]

  row=["A.1 Compliance with availability index","89%","0,01% of the monthly fee for each percentage point under the SLA"];
  rows.push(row);
  row=["B.1 Cold satisfaction","90%","0,01% of the monthly fee for each percentage point under the SLA"];
  rows.push(row);
  row=["B.2 Hot satisfaction","90%","0,01% of the monthly fee for each percentage point under the SLA"];
  rows.push(row);
  row=["B.3 Compliance with the agreed Scheduled Activities Plan","90%","0,01% of the monthly fee for each percentage point under the SLA"];
  rows.push(row);


  let response={
    tableName :"penaltiesRelatedMonitoringSystem",
    tableHeader :header,
    tableRows : rows
  }
  return response;
}
const penaltiesRelatedNonConformities = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["SPECIFIC INDICATOR AREA","DESCRIPTION","PERIMETER","PENALTY"]

  row=["Documents to deliver","Failure to meet creation or delivery deadlines, for documents to be provided in the contract","Defined in the specific contract","50 $ for each non-compliant document"];
  rows.push(row);
  row=["Team Meetings","Non-participation of a Provider's representative on the regular meetings defined by the contract","Defined in the specific contract","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Health and Safety","Non-compliance with the wearing of PPE","Defined in the specific contract","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Activity to deliver traceability","Absence of traceability of a planned activity/request on the Information System","Defined in the specific contract","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Master Data","Master Data development and updating delay","National laws and regulations","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Repetition of non-conformity","Repetition of a failure/non-conformity on the same equipment/area/element already managed in the current month","Defined in the specific contract","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Extemporaneous check","Non-conformity detected on filed (not during an inspection)","Defined in the specific contract","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Non-compliance with agreed Response Time","Failure to meet the agreed Response time for Corrective activities","Number of failures > 2 over a period of 10 working days","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Non-compliance with agreed Correction Time","Failure to meet the agreed Correction time for Corrective activities","Numbers of failure checked","50 $ for every 8h of delay"];
  rows.push(row);
  row=["Non-compliance with Budget Estimate Time","Failure to meet the agreed Budget Estimate time for Corrective activities","Defined in the specific contract","50 $ for every 8h of delay"];
  rows.push(row);



  let response={
    tableName :"penaltiesRelatedNonConformities",
    tableHeader :header,
    tableRows : rows
  }
  return response;
}
const preventiveMaintenanceProcedures = async (parameters) => {
  // service requirement
  // dipende da PB_Services
  // parametri --> serviceTypeDetails
  // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
  // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
  /*
  let p=getParameterValue(parameters,"serviceTypeDetails");
  const results = await models.PB_ServiceRequirement.findAll({
    attributes: ['serviceName','serviceRequirementDescription'],
    where : {
      serviceName : p
    }
  });*/
  let row=[]
  let rows=[]
  let header=["SYSTEM","COMPONENT","ACTIVITY","FREQUENCES"]

  row=["HVAC","Technical Rooms","Exposed ductwork will be checked for leaks and proper insulation","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Belts and pulleys will be inspected and adjusted as required - Belts replaced as required","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Thermostats will be checked and calibrated as required","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Motors and Bearings will be lubricated as required","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Controls and safeties will be tested","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Condensate drain will be checked and cleaned as required","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Relays and contactors will be inspected","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Unit wiring will be inspected","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Temperatures and pressures will be recorded","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Inspection report and prompt follow up of any abnormal conditions or necessary repairs","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","External cleaning of the equipment","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Internal cleaning of the equipment","Monthly"];
  rows.push(row);
  row=["HVAC","Technical Rooms","Tightening bolts","Monthly"];
  rows.push(row);




  let response={
    tableName :"preventiveMaintenanceProcedures",
    tableHeader :header,
    tableRows : rows
  }
  return response
}
const genericTechnicalRequirements = async (parameters) => {
   // service requirement
   // dipende da PB_Services
   // parametri --> serviceTypeDetails
   // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
   // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
   let p=getParameterValue(parameters,"serviceTypeDetails");
   const results = await models.PB_ServiceRequirement.findAll({
     attributes: ['serviceName','serviceRequirementDescription'],
     where : {
       serviceName : p
     }
   });
   let response={
     tableName :"genericTechnicalRequirements",
     tableHeader :[p],
     tableRows : []
   }
   for (r in results) {
     response.tableRows.push([results[r].serviceRequirementDescription])
   }
   return response;
}
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
const getAllContracts= async (req, res) => {
  try {
    //console.log("getAllPlaybooks");

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
      //console.log("obj[context][answers] --> " + obj["context"]["answers"]);
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
              //console.log("questions:" + JSON.stringify(surveys[survey].sections[section].questions[question]));
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
const createPlaybook = async (req, res) => {
  try {
    var  pb=req.body;
    //consoleLog(pb);
    if (!pb.idMember) {
      pd["idMember"] ="5d494dc959860e001747eb4f";
    }
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
                  //console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
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
                    //console.log(option);
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
                //console.log(option);
                await models.SM_SurveySectionQuestionOption.create(option);
            }
          }
	       }
    }
    let ins = await models.FE_CardsList.create(cardList);

    //console.log("------------ BEGIN SURVEY -------------------");
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
    //console.log(risposte);
    pb["context"]["answers"]=risposte;
    //console.log("------------ END SURVEY -------------------");

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
          //console.log("AGGIORNATO --> " + pb.surveys[sur].sections[sec].questions[q].name)
        }
      }
    }
  }
  return pb
}
const addTextFieldsToTables= async(contractId) => {
      // service requirement
    // dipende da PB_Services
    // parametri --> serviceTypeDetails
    // idService => query --> SELECT from PB_ServiceClasses WHERE name == parametro ('HVAC')
    // TABLE => select * from PB_ServiceRequirements where 'idService' = idService
    /*
    let p=getParameterValue(parameters,"serviceTypeDetails");
    const results = await models.PB_ServiceRequirement.findAll({
      attributes: ['serviceName','serviceRequirementDescription'],
      where : {
        serviceName : p
      }
    });*/
    let parameters = await models['SM_SurveyParameter'].findOne({
      where: {
        playBookId: contractId,
        name : "serviceTypeDetails"
      }
    });
    //console.log("VIEW - parameters")
    //consoleLog(parameters)
    let updated=false;
    
    if (parameters) {
      if (parameters.updated==true) updated=true;
    }
    //console.log("VIEW - serviceTypeDetails UPDATED : " + updated);
    

    

    let p="serviceTypeDetailsTable";
    const serviceTypeDetailsTable = await models.SM_SurveySectionQuestion.findAll({
      where: { 
        tableName: p,
        idPlaybook: contractId
      }      
    });
    //consoleLog(serviceTypeDetailsTable);
    let row=[]
    let rows=[]
    let header=["System","Component","Indicate the number of assets/elements","Add any other useful information"]

    
    for (serviceType=0;serviceType<serviceTypeDetailsTable.length;serviceType++) {
      if ((serviceType % 2)==0) {
        a=serviceTypeDetailsTable[serviceType];
        b=serviceTypeDetailsTable[serviceType+1];
        if (a.tooltip.length>0) {
          row=["HVAC",a.tooltip,a,b];
        } else {
          row=["HVAC",a.code,a,b];
        }
        rows.push(row);
      }
    }        
    let response={      
      tableHeader :header,
      tableRows : rows,
      updated : updated
    }
    return response;
}
function addToTable(section,obj2add) {
  for (q in section.questions) {
    if (section.questions[q].code===obj2add.tableName) {
      if (section.questions[q].tableRows) {
        section.questions[q].tableHeader.push(obj2add.tableHeader)
        section.questions[q].tableRows[0].push(obj2add)
      } else {
        section.questions[q]["tableHeader"]=[];
        section.questions[q].tableHeader.push(obj2add.tableHeader)
        section.questions[q]["tableRows"]=[];
        section.questions[q].tableRows.push([obj2add])
      }
    }
  }
  //console.log('\x1b[33m');
  //console.log("section " + JSON.stringify(section,null,2));
//  console.log('\x1b[0m');
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

    let questionUdated= {
      "updated" : false
    }

    await models.SM_SurveySectionQuestion.update(questionUdated, {
      where: { idPlaybook: pb.id }
    });

    /*
    var quest={
      "updated" : false
    }
    await models.SM_SurveySectionQuestion.update(quest, {
      where: { createdAt: null }
    });*/
    //UPDATE status

    //UPDATE answers
    var answers=playbook.answers;

    for (a in answers) {
      for (b in answers[a]) {
        for (c in answers[a][b]) {   
          const findAnswer=await models.SM_SurveyAnswer.findOne({where: { questionId: answers[a][b][c].questionId }});       
          //console.log("Find One answer questionId --> " + answers[a][b][c].questionId + " status : ")
          //consoleLog(findAnswer)
          const status=await models.SM_SurveyAnswer.update(answers[a][b][c], {where: { questionId: answers[a][b][c].questionId }});
          //console.log("Update answer questionId --> " + answers[a][b][c].questionId + " status : " + status)
        }
      }
    }


    //UPDATE CARD Status
    let listCard = await models.FE_ScrumsList.findOne({
      where: { status: playbook.status }
    });
    //console.log("listCard" + JSON.stringify(listCard));
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
    //console.log("************************** parameters *******************************************************")
    //consoleLog(parameters,"");
    //console.log("************************** answers *******************************************************")
    //consoleLog(answers,"");
    for (p in parameters) {
      for (a in answers) {
        for (b in answers[a]) {
          for (c in answers[a][b]) {
            if (answers[a][b][c].questionId==parameters[p].questionId) {
              if (answers[a][b][c].value) console.log("answer " + answers[a][b][c].value)
              if (parameters[p].value) console.log("parameter " + parameters[p].value)
              if (answers[a][b][c].value === parameters[p].value) {
                     //console.log("no changes")
                     let question = await models['SM_SurveySectionQuestion'].findOne({where: { id: parameters[p].questionId }});
                     await updateParams(answers[a][b][c],question.code,playbook.id,false);
      				  } else {
                    //console.log("changes found")
                    //cerco question code:
          					let question = await models['SM_SurveySectionQuestion'].findOne({where: { id: parameters[p].questionId }});
          					//console.log("change on question code : " + question.code);
          					//console.log("change on question name : " + question.name);
          					let result;
          					let par2update={};

                    switch(question.code) {
                      case "building":
                          //console.log("answer " + answers[a][b][c].value)
                          //console.log("playbook.id " + playbook.id)
                          await updateBuilding(answers[a][b][c].value,playbook.id);
                          await updateParams(answers[a][b][c],question.code,playbook.id,true);
                      break;
                      case "serviceHours" :
        						      await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "duration" :
        						      await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
                      case "contractExtensionRule" :
        						      await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "serviceType" :
              						await updateServiceType(answers[a][b][c],playbook);
              					  await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
                      case "serviceTypeDetails":
              						//console.log("serviceTypeDetails")
              						for (sur in playbook.surveys) {
              						  for (sec in playbook.surveys[sur].sections) {
              							for (q in playbook.surveys[sur].sections[sec].questions) {
              							  if (playbook.surveys[sur].sections[sec].questions[q].code==="serviceTypeDetailsTable") {
                                //consoleLog(playbook.surveys[sur].sections[sec].questions[q],"")
                                //consoleLog(playbook.surveys[sur].sections[sec],"")
                								result={
                								  "surveyId" : sur,
                								  "sectionId" : sec,
                								  "questionId" : q
                								}
              							  }
              							}
              						  }
              						}
              						//consoleLog(result,"")
              						playbook.surveys[sur].sections[sec].questions[q].update=true;
                          let surveySectionId= await models['SM_SurveySection'].findOne({where: { idPlaybook: playbook.id,code: "serviceInScope"}});
                          console.log("surveySectionId : " + surveySectionId.id);
              						tableRows=[];
              						tableHeader: ["System","Component","# of components of served area sf","Add any other useful information"]
              						let serviceAssetComponent= await models['PB_ServiceAssetComponent'].findAll({where: { serviceName: answers[a][b][c].value }});
              						for (sAC in serviceAssetComponent) {
              						  let question2add01={
                            "idPlaybook" : playbook.id,
                            "idSection" : surveySectionId.id,
              							"code": camelCode(serviceAssetComponent[sAC].assetComponentType),
              							"name": "# of elements",
              							"tooltip": serviceAssetComponent[sAC].assetComponentType,
              							"nameI98n": "",
              							"tooltipI18n": "",
              							"type": "STRING",
              							"flow": false,
              							"required": false,
              							"isParameter" : false,
              							"updated" : true,
                            "tableName" : "serviceTypeDetailsTable"
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
                            "idPlaybook" : playbook.id,
                            "idSection" : surveySectionId.id,
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
                            "tableName" : "serviceTypeDetailsTable"
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
                          //consoleLog(tableRows);
              						playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableHeader=tableHeader;
              						playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableRows=tableRows;
              						//console.log('\x1b[33m');
              						//console.log("tableRows:" + JSON.stringify(tableRows,null,2));
              						//console.log('\x1b[0m');
              						par2update={
              						  "value" : answers[a][b].value,
              						}
              						await models.SM_SurveyParameter.update(par2update, {
              						  where: { questionId:answers[a][b].questionId }
              						});
                          await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "facilityServiceCondition" :
          						    await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "serviceLevel" :
          						    await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "preventiveMaintenance" :
          						    await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
                      case "preventiveMaintenanceRemuneration" :
          						    await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "correctiveActivities" :
          					      await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
                      case "correctiveActivitiesRemuneration" :
          					      await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "serviceRequestRemuneration" :
          						    await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
          					  case "onSiteTeamRemuneration" :
          						    await updateParams(answers[a][b][c],question.code,playbook.id,true);
          						break;
                    }

      				  }
            }
          }
        }
      }
    }
    let updatedPlaybook = await getPlayBookFromId(pb.id);

    return res.status(200).json( updatedPlaybook );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const cleandDB = async (req,res) => {
  try {

    await models.SM_SurveyParameter.destroy({
      where: {},
      truncate: true })
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
                //console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
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
                  //console.log(option);
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
      //console.log('\x1b[33m');
      //console.log("surveyEntity " + JSON.stringify(surveyEntity,null,2));
      //console.log('\x1b[0m');
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
        //console.log('\x1b[36m');
        //console.log("surveySectionEntity " + JSON.stringify(surveySectionEntity,null,2));
        //console.log('\x1b[0m');
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
            //console.log('\x1b[34m');
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
            //console.log('\x1b[32m');
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

        //console.log("surveySectionQuestionEntity " + JSON.stringify(surveySectionQuestionEntity,null,2));
        //console.log('\x1b[0m');
        }
      }

    }
    return res.status(200).json({});
}
const viewPlayBookById = async (playBookId) => {
  survey = await models['SM_Survey'].findAll({
    where: {'idPlaybook': playBookId},
    order: [
      [ { model: models.SM_SurveySection , as: 'sections'}, 'id', 'ASC'],
      [ { model: models.SM_SurveySection , as: 'sections'}, { model: models.SM_SurveySectionQuestion, as: 'questions' }, 'id', 'ASC'],
      [ { model: models.SM_SurveySection , as: 'sections'}, { model: models.SM_SurveySectionQuestion, as: 'questions' },{ model: models.SM_SurveySectionQuestionOption, as: 'options' }, 'id', 'ASC']
    ],
    include: [
      {
        where: {'idPlaybook': playBookId},
        model: models.SM_SurveySection,
        as: "sections",

        include: [
          {
            where: {'idPlaybook': playBookId},
            model: models.SM_SurveySectionQuestion,
            attributes:['code','name','tooltip','type','icon','updated','required','flow'],
            as: "questions" ,
            include: [
              {
                where: {'idPlaybook': playBookId},
                attributes:['name','defaultValue'],
                model: models.SM_SurveySectionQuestionOption,
                as: "options"
              }
            ]
          }
        ]
      }
    ]
  });
  return survey[0];
}
const createPlaybookWithSurvey = async (req, res) => {
  try {
    var  pb=req.body;
    if (!pb.idMember) {
      pb["idMember"] ="5d494dc959860e001747eb4f";
    }

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
    //console.log(playBookId);
    let s= await addSurvey(playBookId);
    pb["surveys"] = await models['SM_Survey'].findAll({
      where: {idPlaybook:post.id},
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
                  //console.log("TABLE --> " + surveys[survey].sections[section].questions[question].tableInput);
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
                    //console.log(option);
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
                //console.log(option);
                await models.SM_SurveySectionQuestionOption.create(option);
            }
          }
	       }
    }
    let ins = await models.FE_CardsList.create(cardList);

    //console.log("------------ BEGIN SURVEY -------------------");
    var risposte={};
    //console.log(pb["surveys"]);
    for (survey in pb["surveys"]) {
      //console.log("pb.surveys[survey].id --> " + pb.surveys[survey].id);
      var ID=pb.surveys[survey].id;
      risposte[ID]={};
      //console.log("------------ SURVEY -------------------");
      for (section in pb.surveys[survey].sections) {
        var sectionCode=pb.surveys[survey].sections[section].code.toString();
        risposte[ID][sectionCode]={};
        //console.log("------------ SECTION -------------------");
        for (question in pb.surveys[survey].sections[section].questions) {
          //console.log("------------ QUESTION -------------------");
          var QUESTION_ID=pb.surveys[survey].sections[section].questions[question].id;
          var QUESTION_CODE=pb.surveys[survey].sections[section].questions[question].code;
          var answer={
            "playBookId" : post.id,
            "questionId" : QUESTION_ID,
            "value": ""
          }

          //pb.surveys[survey].sections[section].questions[question].updated=false;

          let a=await models.SM_SurveyAnswer.create(answer);
          //console.log(a);
          risposte[ID][sectionCode][QUESTION_CODE]={};
          risposte[ID][sectionCode][QUESTION_CODE]["questionId"]=QUESTION_ID;
          risposte[ID][sectionCode][QUESTION_CODE]["value"]="";

        }
      }

    }
    //console.log(risposte);
    pb["context"]["answers"]=risposte;
    //console.log("------------ END SURVEY -------------------");

    return res.status(201).json(
      post.id
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
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
      //console.log('\x1b[33m');
      //console.log("surveyEntity " + JSON.stringify(surveyEntity,null,2));
      //console.log('\x1b[0m');
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
        //console.log('\x1b[36m');
        //console.log("surveySectionEntity " + JSON.stringify(surveySectionEntity,null,2));
        //console.log('\x1b[0m');
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
              surveySectionQuestionEntity["tableHeader"]=tableHeader;
            }
            if (surveyModel[survey].sections[section].questions[question].tableRows) {
              var righe=surveyModel[survey].sections[section].questions[question].tableRows;
              tableRows=[];
              for (r0 in righe) {
              	riga=righe[r0];
                tableRow=[];
              	for (r1 in riga) {
              	  if (getType(riga[r1])=="object") {
                		if (riga[r1].type=="SELECT") {
                			var isParameter=false;
                			var tableInput="";
                			var valueInput="";
                			if (riga[r1].tableInput) {
                			tableInput=riga[r1].tableInput;
                			}
                			if (riga[r1].valueInput) {
                			valueInput=riga[r1].valueInput;
                			}
                			if (riga[r1].isParameter) {
                			isParameter=true;
                			}
                			var surveySectionQuestionEntityNested={
                				"idPlaybook" : playBookId,
                				"idSection" : surSec.id,
                				"code" : camelCode(riga[r1].name),
                				"name" : riga[r1].name,
                				"tooltip" : riga[r1].tooltip,
                				"nameI98n" : riga[r1].nameI98n,
                				"type" : riga[r1].type,
                				"icon" : riga[r1].icon,
                				"required" : riga[r1].required,
                				"flow" : riga[r1].flow,
                        "tableName" : surveySectionQuestionEntity.code,
                				"tableInput" : tableInput,
                				"valueInput" : valueInput,
                				"isParameter" : isParameter,
                			}
                			let surSecQue=await models.SM_SurveySectionQuestion.create(surveySectionQuestionEntityNested);
                			if (surveySectionQuestionEntityNested.isParameter) {
                				var surveyParameter={
                				  "playBookId" : playBookId,
                				  "questionId" : surSecQue.id,
                				  "value" : "",
                				  "name" : surveySectionQuestionEntityNested.code
                				}
                				let surParam=await models.SM_SurveyParameter.create(surveyParameter);
                			}
                      tableRow.push("SELECT_" +camelCode(riga[r1].name))
                		}
              	  } else {
                    //consoleLog(riga[r1])
                    tableRow.push(riga[r1])
                  }
              	}
                tableRows.push(tableRow.toString());
              }
              surveySectionQuestionEntity["tableRows"]=tableRows.toString();

            }
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
            //console.log('\x1b[32m');
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
        }
      }

    }

    return;
}
// ************************************************
// funzioni update playBook
const loadAnswersFromDB = async (playBookId) => {
}
const updateParams = async (answer,questionCode,playbookId,updated) => {

  //console.log('\x1b[33m');
  //console.log("answer " + JSON.stringify(answer,null,2));
  //console.log('\x1b[0m');
  par2update={
    "value" : answer.value,
    "name" : questionCode,
    "updated" : updated
  }

  let response=await models.SM_SurveyParameter.update(par2update, {
    where: {
      questionId:answer.questionId,
      playBookId: playbookId
    }
  });
}
const updateBuilding = async (answerValue,playbookId) => {
  switch(answerValue) {
    // da togliere la cablatura a codice
    case "51 Melcher St":
      //UPDATE cover
      var pb={
        "id" : playbookId,
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
    where: { id: playbookId }
  });
}
const updateServiceType= async (answer,playbook) => {
  // ******************************************************** serviceTypeDetails ***********************************/
  // serviceTypeDetails --> lista dei servizi legati alla tipologia scelta --> serviceType
  let checkServiceType=await models['SM_SurveySectionQuestion'].findOne(
    {
      where: {
        code: "serviceTypeDetails",
        idPlaybook : playbook.id
      }
    }
  )
  if (checkServiceType) {
    const deleted = await models.SM_SurveySectionQuestion.destroy(
      {
        where: {
          id: checkServiceType.id,
          idPlaybook : playbook.id
        }
      });
    await models.SM_SurveyAnswer.destroy(
      { where:
        {
          questionId: checkServiceType.id,
          playBookId: playbook.id
        }
      });
    await models.SM_SurveySectionQuestionOption.destroy(
      { where: {
        idQuestion: checkServiceType.id,
        idPlaybook: playbook.id
      }
    });
    if (deleted)  {}//console.log("serviceTypeDetails DELETED")
  }
  for (sur in playbook.surveys) {
    for (sec in playbook.surveys[sur].sections) {
      for (q in playbook.surveys[sur].sections[sec].questions) {
        if (playbook.surveys[sur].sections[sec].questions[q].code==="serviceTypeTable") {
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
  let serviceType = await models['PB_ServiceClass'].findOne(
    {
      where: {
        name: answer.value
      }
    });
  let service = await models['PB_Service'].findAll(
    {
      attributes: [['serviceName', 'name'],['serviceName', 'defaultValue']],
      where: { idServiceClass: serviceType.id }
    });
  let serviceTypeQuestion = await models['SM_SurveySectionQuestion'].findOne({
    where: {
      code: "serviceType",
      idPlaybook: playbook.id
    }
  });

  letserviceTypeTable={
    "updated" : true
  }

  await models['SM_SurveySectionQuestion'].update(letserviceTypeTable,{
    where: {
      code: "serviceTypeTable",
      idPlaybook: playbook.id
    }
  });
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
    "tableHeader" : "Select the systems that must be provided"
  }
  let surSecQue0=await models.SM_SurveySectionQuestion.create(tableRow);
  let answerAdd0={
    "playBookId" : playbook.id,
    "questionId" : surSecQue0.id,
    "value" : ""
  }
  let answ0=await models.SM_SurveyAnswer.create(answerAdd0);
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
  let newParam01={
    "playBookId" : playbook.id,
    "questionId" : surSecQue0.id,
    "value" : "",
    "name" : "serviceTypeDetails"
  }
  //consoleLog(newParam01);
  await models.SM_SurveyParameter.create(newParam01);
  tableRows.push(tableRow);
  // ******************************************************** serviceTypeDetails ***********************************/

  // ******************************************************** facilityServiceCondition ***********************************/
  let checkfacilityServiceCondition=await models['SM_SurveySectionQuestion'].findOne(
    {
      where: { code: "facilityServiceCondition",
      idPlaybook : playbook.id
    }
  })
  if (checkfacilityServiceCondition) {
    const deleted = await models.SM_SurveySectionQuestion.destroy({ where: { id: checkfacilityServiceCondition.id }});
    await models.SM_SurveyAnswer.destroy(
      {
        where:
        {
          questionId: checkfacilityServiceCondition.id,
          playBookId: playbook.id
        }
      });
    await models.SM_SurveySectionQuestionOption.destroy(
      {
        where: {
          idQuestion: checkfacilityServiceCondition.id,
          idPlaybook: playbook.id
        }
      });
    if (deleted) {} //console.log("serviceTypeDetails DELETED")
  }
  let facilityIndex= await models['PB_ConditionIndex'].findAll(
    {
      attributes: [['levelTypeName', 'name'],['levelTypeName', 'defaultValue']]
    });
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
    "options": facilityIndex,
    "tableName" : "serviceTypeTable",
    "tableHeader" : "Select the average facility condition of your physical assets"
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
  let newParam02={
    "playBookId" : playbook.id,
    "questionId" : surSecQue1.id,
    "value" : "",
    "name" : "facilityServiceCondition"
  }
  //consoleLog(newParam02);
  await models.SM_SurveyParameter.create(newParam02);
  tableRows.push(tableRow);
  let answerAdd1={
    "playBookId" : playbook.id,
    "questionId" : surSecQue1.id,
    "value" : ""
  }
  let answ1=await models.SM_SurveyAnswer.create(answerAdd1);
  // ******************************************************** facilityServiceCondition ***********************************/
  //aggiungo le question al play book
  playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableName="serviceTypeDetails";
  playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableHeader=[,"Select the average facility condition of your physical assets"];
  playbook.surveys[result.surveyId].sections[result.sectionId].questions[result.questionId].tableRows=tableRows;
}
// funzioni update playBook
// ************************************************

module.exports = {

  getContractById,
  getAllContracts,
  getAllMembers,
  getAllSurveyDynamics,
  getAllSurveyByType,
  getAllSurvey,
  getSurveyById,
  createPlaybook,
  updateContract,
   cleandDB,
  generateQuestions,
  importQuestionsFromJSON,
  deletePlaybooks,
  addSurvey,
  createPlaybookWithSurvey,
  viewPlayBookById,

};
