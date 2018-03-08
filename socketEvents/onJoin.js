module.exports = function(socket) {

    socket.on('join', function(data) {
        socket.join(data.conversationId); // We are using room of socket io
    });

};
