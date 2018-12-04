exports.IsAuthenticated = function(request, response, next) {
    if (request.IsAuthenticated()) {
        next();
    } else {
        next(new Error(401));
    }
};

exports.destroySession = function(request, response, next) {
    request.logOut();
    request.session.destroy();
    response.redirect("/");
};
