const { validationErrorHandler } = require("../../utils/validationErrorHandler")


describe("Unit testing validationErrorHandler", () => {
    const errorsAnyRequiredPrototype = [
        {
            code: 'any.required',
            local: { label: 'maxCount', key: 'maxCount' }
        }
    ]
    const errorsMaxLessMinPrototype = [
        {
            code: 'number.min',
            local: { limit: { key: 'minCount' }, label: 'maxCount', key: 'maxCount' }
        }
    ]
    const errorsDateMinPrototype = [
        {
            code: 'date.min',
            local: { limit: { key: 'startDate' }, label: 'endDate', key: 'endDate' }
        }
    ]
    test("should have array and returns 'required' error message", async () => {
        expect(Array.isArray(validationErrorHandler(errorsAnyRequiredPrototype))).toBeTruthy();
        expect(validationErrorHandler(errorsAnyRequiredPrototype)[0].code).toBe('any.required');
        expect(validationErrorHandler(errorsAnyRequiredPrototype)[0].message).toBe("maxCount should not be empty!");
    });

    test("should have array and returns 'maxCount should be greater than minCount' error message", async () => {
        expect(Array.isArray(validationErrorHandler(errorsMaxLessMinPrototype))).toBeTruthy();
        expect(validationErrorHandler(errorsMaxLessMinPrototype)[0].code).toBe('number.min');
        expect(validationErrorHandler(errorsMaxLessMinPrototype)[0].message).toBe("maxCount must be greater than or equal to minCount.");
    });
    test("should have array and returns 'endDate should be greater than startDate' error message", async () => {
        expect(Array.isArray(validationErrorHandler(errorsDateMinPrototype))).toBeTruthy();
        expect(validationErrorHandler(errorsDateMinPrototype)[0].code).toBe('date.min');
        expect(validationErrorHandler(errorsDateMinPrototype)[0].message).toBe('endDate must be greater than or equal to startDate.');
    });
})