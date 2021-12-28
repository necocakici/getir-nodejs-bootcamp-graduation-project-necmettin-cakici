class ApiError extends Error {
  // Function that invoked when ApiError class used,
  //it creates an object instance of that class.
  constructor(message, statusCode, code) {
    super(message);

    switch (statusCode) {
      case 404:
        this.code = -1;
        break;

      case 400:
        this.code = -2;
        break;

      default:
        this.code = -3
        break;
    }

    this.msg = message;
    this.status = statusCode;
  }
}

module.exports = ApiError;