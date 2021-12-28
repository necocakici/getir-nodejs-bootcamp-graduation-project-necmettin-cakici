const Joi = require("joi");
const { validationErrorHandler } = require("../utils/validationErrorHandler");

// Creating a Joi object to validate our payload
const fetchWithDateAndCount = Joi.object({
  startDate: Joi.date().iso().required().error(validationErrorHandler),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required().error(validationErrorHandler),
  minCount: Joi.number().integer().min(0).required().strict().error(validationErrorHandler),
  maxCount: Joi.number().integer().min(Joi.ref('minCount')).required().strict().error(validationErrorHandler),
});

module.exports = {
  fetchWithDateAndCount,
};
