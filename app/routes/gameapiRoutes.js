//=========================================================================================
//api-routes.js - this file offers a set of routes for displaying and saving data to the db
//==========================================================================================
const models = require("../models");

//Routes
//=============================================================
module.exports = function(app) {
    //GET route for getting all of the games
    app.get("/api/games", function(req, res) {
        const query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        //Here we add an "include" property to our option in our findAll query
        //We set the value to an array of the models we want to include in a left outer join
        //In this case, just models.User
        models.Game.findAll({
            where: query,
            include: [models.Author]
        }).then(function(modelsGame) {
            res.json(modelsGame);
        });
    });

    //Get route for retrieving a single game
    app.get("/api/games/:id", function(req, res) {
        //Here we add an "include" property to our option in our findOne query
        //We set the value to an array of the models we want to include in a left outer join
        //In this case, just models.User
        models.Game.findOne({
            where: {
                id: req.params.id
            },
            include: [models.User]
        }).then(function(modelsGame) {
            res.json(modelsGame);
        });
    });

    //POST route for saving a new game
    app.post("/api/games", function(req, res) {
        models.Game.create(req.body).then(function(modelsGame) {
            res.json(modelsGame);
        });
    });

    //DELETE route for deleting games
    app.delete("/api/games/:id", function(req, res) {
        models.Game.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(modelsGame) {
            res.json(modelsGame);
        });
    });

    //PUT route for updating games
    app.put("/api/games", function(req, res) {
        models.Game.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(modelsGame) {
            res.json(modelsGame);
        });
    });
};
