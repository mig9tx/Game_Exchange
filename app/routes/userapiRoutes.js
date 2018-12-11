//API ROUTES - this file offers a set of routes for displaying and saving data to the db

//Dependencies
//=================================================
const db = require("../models");
//=================================================

//Routes
//=================================================
module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        //Here we add an "include" property to our options in our findAll query
        //We se the value to an array of the models we want to include in a left outer join
        //In this case, just db.Post
        db.User.findAll({
            include: [db.Game]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/users/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        //We set the value to an array of the models we want to include in a left outer join
        //in this case, just db.Game
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Game]
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/users", function(req, res) {
        console.log(req.body);
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
};
