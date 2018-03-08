var router = require("express").Router();

module.exports = function() {

    // TODO New page to redirect?

    router.get("*", function(req, res) {
        res.redirect('/');
    });

    router.post("*", function(req, res) {
        res.redirect('/');
    });

    return router;
};
