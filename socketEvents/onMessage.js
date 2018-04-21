var flashUtils = require("../utils/flashUtils");

var redirectLocation = "back";

module.exports = function (pool, socket, io) {

    socket.on("message", function (newMessage) {
        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var message = newMessage.message;
            var username = newMessage.username;

            var senderUserId = newMessage.senderUserId;
            var conversationId = newMessage.conversationId;

            var insertMessage = require('./queries/insertMessage.sql');

            connection.query(insertMessage, [message, senderUserId, conversationId],
                function (err, rows) {
                    connection.release();

                    if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                        return;

                    console.log("Successfully sent: " + message);

                    io.sockets.in(conversationId).emit("new_message", {
                        username: username,
                        message: message
                    });
                }
            );
        });
    });

};