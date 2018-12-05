const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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
        db.User.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        });
    })
);

//exports configured passport
module.exports = passport;
