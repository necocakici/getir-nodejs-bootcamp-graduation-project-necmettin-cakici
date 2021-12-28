const express = require("express");
const { validate } = require("../middlewares/validate");
const { fetchRecordsWithCondition } = require("../controllers/records");
const { fetchWithDateAndCount } = require("../validations/record");

const router = express.Router();

// path -> middleware -> controller
router.post("/", validate(fetchWithDateAndCount), fetchRecordsWithCondition);

module.exports = router;