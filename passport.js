const passport = require("passport");
const LocalStrategy = require("passport-local").LocalStrategy;
const db = require("../models");

//Serialize Sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

//Deserialize Sessions
passport.deserializeUser(function(user, done) {
    db.User.find({ where: { id: user.id } })
        .success(function(user) {
            done(null, user);
        })
        .error(function(err) {
            done(err, null);
        });
});

//For Authetication Purposes
passport.use(
    new LocalStrategy(function(username, password, done) {
        db.User.find({ where: { username: username } }).success(function(user) {
            passwd = user ? user.password : "";;
            isMatch = db.User.validPassword(password, passwd, done, user);;
        });
    })
);
