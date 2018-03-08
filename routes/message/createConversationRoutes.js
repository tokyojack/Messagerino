var router = require("express").Router();

var flashUtils = require('../../utils/flashUtils');
var middleMan = require("../../utils/middleMan");

var redirectLocation = "/home";

// URL: "/createconversation"
module.exports = function(pool) {

    //"createConversation.ejs" page
    router.get("/", middleMan.isLoggedIn, function(req, res) {
        res.render("messenging/createConversation.ejs");
    });

    // Inserts conversation from "createConversation.ejs" form submit
    router.post("/", middleMan.isLoggedIn, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var insertConversation = require('./queries/insertConversation.sql');

            connection.query(insertConversation, [req.user.id, req.body.username, req.body.username, req.user.id], function(err, row) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                console.log(row);

                // TODO add "todo" list name/type to message?
                flashUtils.successMessage(req, res, '/conversation/' + row.insertId, 'Successfully created a new todo-list!');
            });

        });
    });


    return router;
};
