var router = require("express").Router();
var middleMan = require("../../utils/middleMan");

// URL: "/home"
module.exports = function() {

    // "home.ejs" page
    router.get("/", middleMan.isLoggedIn, function(req, res) {
        res.render("messenging/home.ejs");
    });

    return router;
};
