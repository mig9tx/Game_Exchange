//Path allows us to use relative routes to our HTML files
const db = require("../models");
const passport = require("../config/passport");

const path = require("path");

//Requires custom middleware for checking user log in
const isAuthenticated = require("../config/middleware/application");

module.exports = function(app) {
    app.get("/", function(request, response) {
        //if user already has an account send them to the members page
        if (request.user) {
            response.redirect("/members");
        }
        response.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function(request, response) {
        //if the user already has an account send them to members page
        if (request.user) {
            response.redirect("/members");
        }
        response.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/members", isAuthenticated, function(request, response) {
        response.sendFile(path.join(__dirname, "../public/members.html"));
    });
};
