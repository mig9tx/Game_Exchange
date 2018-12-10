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
    console.log(data);
    res.render("dashboard", data);
};

exports.postGame = function(req, res) {
    const data = {
        user: req.user
    };
    console.log(data);
    res.render("dashboard", data);
};

exports.logout = function(req, res) {
    req.session.destroy(function() {
        req.logout();
        res.redirect("/");
    });
};
