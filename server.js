//dependencies
//nmp packages
require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport"); //authentication
const session = require("express-session"); //authentication
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const path = require("path");

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
app.set("views", path.join(__dirname, "/app/views"));
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: "app/views/layouts"
    })
);
app.set("view engine", ".hbs");

//Models
const models = require("./app/models");

// app.get("/", function(req, res) {
//     res.send("Welcome to Passport with Sequelize");
// });

// Static directory
app.use(express.static("public"));

//Routes
require("./app/routes/auth.js")(app, passport);
require("./app/routes/htmlRoutes.js")(app);

//Passport Strategies
require("./app/config/passport/passport.js")(passport, models.User);

// Syncing our sequelize models and then starting our Express app
// =============================================================
models.sequelize
    .sync()
    .then(function() {
        app.listen(PORT, function() {
            console.log("App listening on PORT " + PORT);
        });
    })
    .catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!");
    });
