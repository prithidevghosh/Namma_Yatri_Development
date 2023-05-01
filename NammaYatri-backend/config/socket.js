
module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "*"
        }
    });
    io.sockets.on('connection', function (socket) {
        console.log("new client added");

        socket.on('disconnect', function () {
            console.log("client got disconnected");
        })
        socket.emit('newmsg', { id: 2, message: "hello from server" })

        socket.on('ackmsg', function (e) {
            console.log(e);
        })
    })
}