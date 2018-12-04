//dependencies
//nmp packages

const express = require("express");

//Requiring our models for syncing
const db = require("./models");

//Sets up the Express App
const PORT = process.env.PORT || 8080;
const app = express();

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});