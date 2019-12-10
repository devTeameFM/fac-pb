const models = require("../database/models");

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
const getAllScrums = async (req, res) => {
  try {
    const scrums = await models.FE_Scrum.findAll({
      order: [[{model: models.FE_ScrumsList, as: 'lists'},'order', 'ASC']],
      
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

module.exports = {
  getAllScrums,
  getScrumById,
  getAllScrumsByMember,
};
