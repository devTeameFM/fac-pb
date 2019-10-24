const models = require("../database/models");
const getAllSurvey = async (req, res) => {
  try {
    const survey = await models.SM_Survey.findAll({
      include: [
        {
          model: models.SM_SurveySection,
          as: "sections"
          //attributes: ['sections', 'question'],
        }
      ]
    });
    return res.status(200).json({ survey });
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


module.exports = {
  getAllSurvey,
  getSurveyById
};
