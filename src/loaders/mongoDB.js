const mongoose = require("mongoose");

async function connectMongoDB() {
  const { DB_HOST, DB_URL, DB_NAME, DB_OPTION } = process.env;
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${DB_HOST}:${DB_URL}/${DB_NAME}?${DB_OPTION}`
    );
    console.log(
      `You're successfully connected to "${connection.connections[0].name}"`
    );
  } catch (err) {
    console.log(`MongoDB connection error`, err);
  }
}

module.exports = { connectMongoDB };
