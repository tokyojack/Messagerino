var router = require("express").Router();

// URL: "/login"
module.exports = function(passport) {

    // Login page
    router.get("/", function(req, res) {
        res.render("authentication/login.ejs");
    });

    // Login's parson when the form is subbmitted
    router.post('/', passport.authenticate('local-login', {
            successRedirect: '/home',
            failureRedirect: '/login'
        }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            }
            else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });


    return router;
};
