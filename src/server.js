const fs = require('fs')
const path = require('path')

//external imports
const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const ApiError = require("./errors/ApiError");
const errorHandler = require("./middlewares/errorHandler");
const { recordRoutes } = require("./routes");

// function that creates app
// we need a function which creates app because we need an for running the server and testing the app
const createServer = () => {
    const app = express();
    app.use(cors())

    // Cheking is there any folder named like logs to create .log file
    if (!fs.existsSync(path.join(__dirname, './logs'))) {
        fs.mkdirSync(path.join(__dirname, './logs'));
    }

    // getting req.body to morgan
    morgan.token('body', (req, res) => JSON.stringify(req.body));

    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs', 'request.log'), { flags: 'a' })

    // setup the logger
    app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]', { stream: accessLogStream }))

    // express json to get json payloads from body
    app.use(express.json());

    app.get("/api", (req, res) => {
        res.status(200).send(`<div>
            <p>Welcome to Getir Final Task API by Necmettin Çakıcı.</p>
            <p>You can check github repo for introductions.</p>
            <a href="https://github.com/getir-nodejs-bootcamp/getir-nodejs-bootcamp-graduation-project-necocakici">
            https://github.com/getir-nodejs-bootcamp/getir-nodejs-bootcamp-graduation-project-necocakici
            </a>
        </div>`
        )
    })

    app.use("/api/records", recordRoutes);

    //! Not found
    app.use((req, res, next) => {
        next(new ApiError(`There is no endpoint like ${req.path} for ${req.method} request.`, 404))
    });

    app.use(errorHandler);

    return app;
}

module.exports = { createServer }