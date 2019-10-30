const models = require("../database/models");

const getAllUserEarnings = async (req, res) => {
  // get the beginning of the current month
  var util = require('util');
  var query = 'SELECT * FROM `MS_Members` ';
            var escapedName = models.sequelize.constructor.Utils.escape();
            queryWithParams = util.format(query, escapedName);
            console.log(queryWithParams);


  return res.status(200).json(query)
};

module.exports = {
  getAllUserEarnings
};
