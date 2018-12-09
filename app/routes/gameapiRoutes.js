//=========================================================================================
//api-routes.js - this file offers a set of routes for displaying and saving data to the db
//==========================================================================================
const db = require("../models");

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
        //In this case, just db.User
        db.Game.findAll({
            where: query,
            include: [db.User]
        }).then(function(dbGame) {
            res.json(dbGame);
        });
    });

    //Get route for retrieving a single game
    app.get("/api/games/:id", function(req, res) {
        //Here we add an "include" property to our option in our findOne query
        //We set the value to an array of the models we want to include in a left outer join
        //In this case, just db.User
        db.Game.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(dbGame) {
            res.json(dbGame);
        });
    });

    //POST route for saving a new game
    app.post("/api/games", function(req, res) {
        console.log(req.body);
        db.Game.create(req.body).then(function(dbGame) {
            res.json(dbGame);
        });
    });

    //DELETE route for deleting games
    app.delete("/api/games/:id", function(req, res) {
        db.Game.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbGame) {
            res.json(dbGame);
        });
    });

    //PUT route for updating games
    app.put("/api/games", function(req, res) {
        db.Game.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbGame) {
            res.json(dbGame);
        });
    });
};
