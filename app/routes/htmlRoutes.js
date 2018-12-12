// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================

require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {
    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads signup.hbs
    app.get("/", function(req, res) {
        res.render("signup");
    });

    // Browse games route loads browsegames.hbs
    app.get("/browsegames", function(req, res) {
        res.render("browsegames");
    });

    // dashboard route
    app.get("/dashboard", isAuthenticated, function(req, res) {
        res.render("dashboard");
    });

    //Edit Post route loads editpost.hbs
    app.get("/editpost", isAuthenticated, function(req, res) {
        res.render("editpost");
    });

    //Post Game route loads postgame.hbs
    app.get("/postgame", isAuthenticated, function(req, res) {
        res.render("postgame", { user: req.user });
    });

    //Sign in route loads signin.hbs
    app.get("/signin", function(req, res) {
        res.render("signin");
    });

    //Sign up route loads signup.hbs
    app.get("/signup", function(req, res) {
        res.render("signup");
    });

    //User Account loads useraccount.hbs
    app.get("/useraccount", isAuthenticated, function(req, res) {
        res.render("useraccount");
    });

    //User logs out of account
    // app.get("/logout", function(req, res) {
    //     req.logout();
    //     res.redirect("/");
    //     console.log("You're logged out");
    // });
};
