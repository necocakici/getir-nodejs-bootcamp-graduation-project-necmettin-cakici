const { createServer } = require('./server')
const config = require("./config");
const loaders = require("./loaders");

const app = createServer()

//setting configs
config();

app.listen(process.env.APP_PORT, () => {

  console.log(`App listening on port ${process.env.APP_PORT}!`);
  // connecting to db etc...
  loaders();
}
);

module.exports = { app }