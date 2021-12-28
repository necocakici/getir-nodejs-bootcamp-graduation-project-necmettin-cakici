const ApiError = require("../errors/ApiError");

//Validating the schema which provided by arguments
const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    // Creating an errorMessage(string) from error array
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(",");
    next(new ApiError(errorMessage, 400))
    return;
  }
  Object.assign(req, value);
  next();
};

module.exports = { validate };
