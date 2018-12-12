const axios = require("axios");
const db = require("../models");

exports = module.exports = {};

exports.signup = function(req, res) {
    res.render("signup");
};

exports.signin = function(req, res) {
    res.render("signin");
};

exports.dashboard = function(req, res) {
    // const query = {};
    // if (req.query.user_id) {
    //     query.UserId = req.query.user_id;
    // }
    //Here we add an "include" property to our option in our findAll query
    //We set the value to an array of the models we want to include in a left outer join
    //In this case, just db.User
    db.Game.findAll({
        where: {
            UserId: req.user.id
        }
        // include: [db.User]
    }).then(function(dbGame) {
        // console.log(dbGame);
        // console.log(req.user);
        // console.log(dbGame);
        res.render("dashboard", {
            dbGames: dbGame,
            user: req.user
        }); //JSON.stringify
    });
};

exports.getImg = function(req, res) {
    const url =
        "https://api-endpoint.igdb.com/games/?search=" +
        req.body.gameTitle +
        "&fields=cover";

    axios
        .get(url, {
            headers: {
                "user-key": process.env.IGDB_KEY,
                Accept: "application/json"
            }
        })
        .then((response) => {
            res.json(response.data);
        })
        .catch((e) => {
            console.log("error", e);
        });
};

exports.postGame = function(req, res) {
    const url =
        "https://www.pricecharting.com/api/products?" +
        process.env.PRICE_KEY +
        "&q=" +
        req.body.gameTitle +
        " " +
        req.body.gameConsole;

    axios.get(url).then((response) => {
        res.json(response.data);
    });

    // const data = {
    //     user: req.user
    // };
    // console.log(data);
    // res.render("dashboard", data);
};

exports.logout = function(req, res) {
    req.session.destroy(function() {
        req.logout();
        res.redirect("/");
    });
};

exports.searchgame = (req, res) => {

    let query = {};
    //nothing in search fields
    if(!(req.body.gameConsole) && !(req.body.gameTitle)){
        query = {
            UserId: {
                $notIn: [req.user.id]
            }
        };
    }
    //title entered, all consoles
    else if(!(req.body.gameConsole)){
        query = {
            UserId: {
                $notIn: [req.user.id]
            },
            title: {
                $like: '%'+req.body.gameTitle+'%'
            }
        };
    }
    //title entered, console selected
    else{
        query = {
            UserId: {
                $notIn: [req.user.id]
            },
            title: {
                $like: '%'+req.body.gameTitle+'%'
            },
            console: req.body.gameConsole
        }
    }
    console.log("queeeeeeeeeery");
    console.log(query);
    

    db.Game.findAll({
        where: query,
        include: [db.User]
    }).then(function(dbGame) {

        // console.log("dbgameeeeeeeeeee");
        // console.log(dbGame);
    
        db.Game.aggregate('console', 'DISTINCT', { plain: false })
        .then(function(dbConsole){

            // console.log("dbConsole");
            // console.log(dbConsole);
            
            res.render("searchgame", {
                dbGames: dbGame,
                currentUser: req.user,
                allconsoles: dbConsole
            });
        });
    });
};
