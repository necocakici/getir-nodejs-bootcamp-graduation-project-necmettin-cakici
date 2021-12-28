const ApiError = require("../errors/ApiError");
const { getRecordsWithCondition } = require("../services/record");

// @desc fetch Records by using the values in the req.body.
const fetchRecordsWithCondition = async (req, res, next) => {
  const { body } = req;
  try {
    // Assigning datas to records 
    const records = await getRecordsWithCondition(body);
    res.status(200).json({
      code: 0,
      msg: "Success",
      records
    })
  } catch (err) {
    next(new ApiError("Internal Server error.", 500))
  }
};

module.exports = {
  fetchRecordsWithCondition,
};
