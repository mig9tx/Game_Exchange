//dependencies
//nmp packages
const express = require("express");
const app = express();
const passport = require("passport"); //authentication
const session = require("express-session"); //authentication
const bodyParser = require("body-parser");
const env = require("dotenv").load();
const exphbs = require("express-handlebars");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For Passport
app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session()); //for Persistent login sessions

//For Handlebars
app.set("views", "./app/views");
app.engine(
    "hbs",
    exphbs({
        extname: ".hbs"
    })
);
app.set("view engine", ".hbs");

//Models
const models = require("./app/models");

app.get("/", function(req, res) {
    res.send("Welcome to Passport with Sequelize");
});

//Routes
let authRoute = require("./app/routes/auth.js")(app, passport);

//Passport Strategies
require("./app/config/passport/passport.js")(passport, models.User);

//Sync the database by importing the the models
models.sequelize.sync().then(function() {
    console.log("Database is working!");
    app.listen(8080, function(err) {
        if (!err) {console.log("Site is Live");}
        else {
            console.log(err);
        }
    });
})
    .catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!");
    });

