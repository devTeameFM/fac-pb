const models = require("../database/models");

const newTask = async (req,res) => {
  try {
    let newTask=req.body;    
    newTask["idMember"]="5d494dc959860e001747eb4f";
    
    let task = await models.PB_Playbook.create(newTask);
    

    //UPDATE CARD Status
    let listCard = await models.FE_ScrumsList.findOne({
      where: { status: newTask.status }
    });

   

    //newTask["status"] = listCard.id
    /*
    const taskUpdated = await models.PB_Playbook.update(newTask, {
      where: { id: task.id }
    });*/

    let newCard={
      "idTask" : newTask.taskId,
      "idList" : listCard.id,
      "createdAt" : new Date(),
      "updatedAt" : new Date()
    }
    
    let addedCard= await models.FE_CardsList.create(newCard);

    
    return res.status(200).json( newTask );
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const updateTaskStatus = async (req,res) => {
  try {
    let status=req.params;
    //UPDATE CARD Status
    let listCard = await models.FE_ScrumsList.findOne({
      where: { status: status.status }
    })
    let updateCard={
      "idTask" : status.idTask,
      "idList" : listCard.id,
    }
    let updateTask={
      "status" : status.status
    }

    const cardUpdated = await models.FE_CardsList.update(updateCard, {
      where: { idTask: status.idTask }
    });

    const taskUpdated = await models.PB_Playbook.update(updateTask, {
      where: { taskId: status.idTask }
    });

    
    return res.status(200).json( newTask );
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getScrumById = async (req,res) => {
  try {
    const { scrumId } = req.params;
    const scrums = await models.FE_Scrum.findOne({
      where: { id: scrumId },
      order: [
        [{ model: models.FE_ScrumsList, as: 'lists' }, 'order', 'ASC'],        
      ],
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
const getAllScrums = async (req, res) => {
  try {
    const scrums = await models.FE_Scrum.findAll({
      order: [
        ['order', 'ASC'], 
        [{ model: models.FE_ScrumsList, as: 'lists' }, 'order', 'ASC'],        
      ],
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

const getAllLists  = async (req, res) => {
  try {
    let lists = await models.FE_ScrumsList.findAll();
    return res.status(200).json( lists );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllScrums,
  getScrumById,
  getAllScrumsByMember,
  newTask,
  updateTaskStatus,
  getAllLists
};
