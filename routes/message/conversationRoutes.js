var router = require("express").Router();

var flashUtils = require('../../utils/flashUtils');
var middleMan = require("../../utils/middleMan");

var redirectLocation = "/home";

// URL: "/conversation"
module.exports = function(pool) {

    // "conversation.ejs" page
    // MIddleman: middleMan.checkIfUserOwnsTodolist,
    router.get("/:id", function(req, res) {

        var id = parseInt(req.params.id);

        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var selectMessages = require('./queries/selectMessages.sql');

            connection.query(selectMessages, [id], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                res.render("messenging/conversation.ejs", {
                    id: id,
                    messages: rows
                });

            });
        });
    });

    return router;
};
