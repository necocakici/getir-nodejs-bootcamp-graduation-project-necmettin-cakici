const validationErrorHandler = (errors) => {
    //mapping errors array and creating a string depends on err.code
    errors.map(err => {
        const { local } = err;
        switch (err.code) {
            case "any.empty":
                err.message = `${local.label} should not be empty!`;
                break;
            case "any.required":
                err.message = `${local.label} should not be empty!`;
                break;
            case "date.format":
                err.message = `${local.label} must be formetted like YYYY-MM-DD`;
                break;
            case 'date.min':
                err.message = `${local.label} must be greater than or equal to ${local.limit.key || local.limit}.`
                break
            case 'number.base':
                err.message = `${local.label} must be a number.`
                break
            case 'number.max':
                err.message = `${local.label} must be less than or equal to ${local.limit}.`
                break
            case 'number.min':
                err.message = `${local.label} must be greater than or equal to ${local.limit.key || local.limit}.`
                break
            case 'number.positive':
                err.message = `${local.label} must be a positive number.`
                break
            case 'number.integer':
                err.message = `${local.label} must be an integer.`
                break
            default:
                break;
        }
    });
    return errors;
}

module.exports = { validationErrorHandler }