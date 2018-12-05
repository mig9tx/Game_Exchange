const bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
    let User = user;
    let LocalStrategy = require("passport-local").Strategy;

    //Serialize user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserialize User
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true //passes entire request to the callback
            },
            function(req, email, password, done) {
                let generateHash = function(password) {
                    return bCrypt.hashSync(
                        password,
                        bCrypt.genSaltSync(8),
                        null
                    );
                };
                User.findOne({
                    where: { email: email }
                }).then(function(user) {
                    if (user) {
                        return done(null, false, {
                            message: "That email is already taken"
                        });
                    } else {
                        let userPassword = generateHash(password);
                        let data = {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            zipcode: req.body.zipcode
                        };
                        User.create(data).then(function(newUser, created) {
                            if (!newUser) {
                                return done(null, false);
                            }
                            if (newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                });
            }
        )
    );
    //LOCAL SIGNIN
    passport.use(
        "local-signin",
        new LocalStrategy(
            {
                usernameField: "email", //by default, local strategy uses username, we will override with email
                passwordField: "password",
                passReqToCallback: true //allows to pass back entire request to callback
            },
            function(req, email, password, done) {
                const User = user;
                const isValidPassword = function(userpass, password) {
                    //compares the password entered with the bCrypt comparison method
                    return bCrypt.compareSync(password, userpass);
                };
                User.findOne({
                    where: { email: email }
                })
                    .then(function(user) {
                        if (!user) {
                            return done(null, false, {
                                message: "Email does not exist"
                            });
                        }
                        if (!isValidPassword(user.password, password)) {
                            return done(null, false, {
                                message: "Incorrect password."
                            });
                        }
                        const userinfo = user.get();
                        return done(null, userinfo);
                    })
                    .catch(function(err) {
                        console.log("Error:", err);
                        return done(null, false, {
                            message: "Something went wrong with your Signin"
                        });
                    });
            }
        )
    );
};
