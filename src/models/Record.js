const Mongoose = require("mongoose");

const RecordSchema = new Mongoose.Schema(
  {},
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("records", RecordSchema);
