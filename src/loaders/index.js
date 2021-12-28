const { connectMongoDB } = require("./mongoDB");

module.exports = () => {
  connectMongoDB();
};
