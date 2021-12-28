const Record = require("../models/Record");

// @params startDate:String, endDate:String, minCount: Number, maxCount: Number
// @return returns a pending Aggregate object
const getRecordsWithCondition = async ({
  startDate,
  endDate,
  minCount,
  maxCount,
}) => {
  return Record.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      }
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: {
          $sum: "$counts",
        },
      },
    },
    {
      $match: {
        totalCount: { $gte: minCount, $lt: maxCount },
      },
    },
  ]);

};

module.exports = {
  getRecordsWithCondition,
};
