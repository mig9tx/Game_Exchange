//dependencies
//nmp packages
const express = require("express");
const app = express();
const passport = require("passport");//authentication
const session = require("express-session");//authentication
const bodyParser = require("body-parser");
const env = require("dotenv").load();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true }));
app.use(passport.initialize());
app.use(passport.session()); //for Persistent login sessions

//Models
const models = require("./app/models");

//Sync the database by importing the the models
models.sequelize.sync().then(function() {
    console.log("Nice! Database looks fine")
}).catch(function(err){
    console.log(err, "Something went wrong with the Database Update!")
});



app.get("/", function(req, res) {
    res.send("Welcome to Passport with Sequelize");
});

app.listen(8080, function(err) {
    if (!err)
        console.log("Site is Live"); else console.log(err);

});
