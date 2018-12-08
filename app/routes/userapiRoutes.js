//API ROUTES - this file offers a set of routes for displaying and saving data to the db

//Dependencies
//=================================================
const models = require("../models");
//=================================================

//Routes
//=================================================
module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        //Here we add an "include" property to our options in our findAll query
        //We se the value to an array of the models we want to include in a left outer join
        //In this case, just models.Post
        models.User.findAll({
            include: [models.Game]
        }).then(function(modelsUser) {
            res.json(modelsUser);
        });
    });

    app.get("/api/users/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        //We set the value to an array of the models we want to include in a left outer join
        //in this case, just models.Game
        models.User.findOne({
            where: {
                id: req.params.id
            },
            include: [models.Game]
        }).then(function(modelsUser) {
            res.json(modelsUser);
        });
    });

    app.post("/api/users", function(req, res) {
        models.User.create(req.body).then(function(modelsUser) {
            res.json(modelsUser);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        models.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(modelsUser) {
            res.json(modelsUser);
        });
    });
};
