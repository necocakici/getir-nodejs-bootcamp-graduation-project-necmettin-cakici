process.env.DB_HOST = "challengeUser"
process.env.DB_URL = "WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net"
process.env.DB_NAME = "getir-case-study"
process.env.DB_OPTION = "retryWrites=true"
process.env.APP_PORT = 8080

const { createServer } = require("../../server");
const mongoose = require('mongoose')

const supertest = require("supertest");

const app = createServer()
const _ENV = process.env;

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${_ENV.DB_HOST}:${_ENV.DB_URL}/${_ENV.DB_NAME}?${_ENV.DB_OPTION}`)
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("POST /api/records", () => {
    const body = {
        startDate: "2014-02-13",
        endDate: "2020-12-30",
        minCount: 750,
        maxCount: 1000
    }

    test("Bad Request POST /api/records", async () => {
        const response = await supertest(app).post("/api/records").send({
            startDate: "2014-02-13",
            endDate: "2020-12-30",
            minCount: 750
        }).expect(400)
        expect(response.body.error.code).toBe(-2);
        expect(response.body.error.msg).toBe("maxCount should not be empty!");
    });

    test("Wrong Path POST /api/records", async () => {
        const response = await supertest(app).post("/api/records123").send(body).expect(404)
        expect(response.body.error.code).toBe(-1);
        expect(response.body.error.msg).toBe("There is no endpoint like /api/records123 for POST request.");
    });

    test("Success POST /api/records", async () => {
        await supertest(app).post("/api/records").send(body)
            .expect(200)
            .then((response) => {
                // Check type and length
                expect(Array.isArray(response.body.records)).toBeTruthy();
                expect(response.body.records.length).toEqual(7);

                // Check data
                expect(response.body.code).toBe(0);
                expect(response.body.msg).toBe("Success");
                expect(response.body.records[0].totalCount).toBeGreaterThanOrEqual(body.minCount);
                expect(response.body.records[0].totalCount).toBeLessThanOrEqual(body.maxCount);
            });
    });


})