module.exports = function(socket) {
    
  socket.on("join", data => socket.join(data.conversationId));

};
