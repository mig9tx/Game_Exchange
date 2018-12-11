const axios = require("axios");

exports = module.exports = {};

exports.signup = function(req, res) {
    res.render("signup");
};

exports.signin = function(req, res) {
    res.render("signin");
};

exports.dashboard = function(req, res) {
    const data = {
        user: req.user
    };

    const url = "/api/games";

    console.log(url);
    axios.get(url).then((response) => {
        const {
            title,
            console,
            image,
            gsPriceBuy,
            gsPriceSell,
            userSellPrice
        } = response.data;
        data.gameData = {
            title,
            console, //gamePrice: gamePrice
            image,
            gsPriceBuy,
            gsPriceSell,
            userSellPrice
        };
    });

    console.log(data.gameData);
    res.render("dashboard", data, data.gameData);
};

exports.postGame = function(req, res) {
    const url = "https://www.pricecharting.com/api/products?" + process.env.PRICE_KEY + "&q=" + req.body.gameTitle + " " + req.body.gameConsole
    console.log(url);
    axios.get(url).then((response) => {
        res.json(response.data);
    });

    // const data = {
    //     user: req.user
    // };
    // console.log(data);
    // res.render("dashboard", data);
};

exports.searchGame = (req, res) => {
    const data = {
        user: req.user
    };

    const {
        gameTitle,
        gameConsole
    } = req.body;

    const url = `https://www.pricecharting.com/api/products?${process.env.PRICE_KEY}&q=${gameTitle} ${gameConsole}`;

    console.log(url);
    axios.get(url).then((response) => {
        const {
            gameTitle,
            gamePrice,
            gameStopPrice
        } = response.data;
        data.gameData = {
            gameTitle,
            gamePrice, //gamePrice: gamePrice
            gameStopPrice
        };

        data.table = [{
                myObj: 'value1'
            },
            {
                myObj: 'valu2'
            }
        ];

        res.render("postGame", data);
    });

};

exports.logout = function (req, res) {
    req.session.destroy(function () {
        req.logout();
        res.redirect("/");
    });
};