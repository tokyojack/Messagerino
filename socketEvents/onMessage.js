module.exports = function(pool, socket, io) {

    socket.on('message', function(newMessage) {

        pool.getConnection(function(err, connection) {

            if (err) {
                console.log(err);
                return;
            }


            var message = newMessage.message;
            var username = newMessage.username;

            var senderUserId = newMessage.senderUserId;
            var conversationId = newMessage.conversationId;

            connection.query("INSERT INTO messages(message, sender_user_id, conversation_id) VALUES(?,?,?)", [message, senderUserId, conversationId], function(err, rows) {
                connection.release();

                if (err) {
                    console.log(err);
                    return;
                }

                console.log("Successfully sent: " + message);

  
                
                io.sockets.in(conversationId).emit('new_message', {username: username, message: message});

            });

        });
    });

};
