//node server which will handel socket io connections
const express = require('express')
const app = express()
const server = require("http").Server(app)
const PORT = process.env.PORT || 8000
const io = require('socket.io')(server)
const user = {};
app.use(express.static("public"))
io.on('connection', socket => {
    let member = socket.client.conn.server.clientsCount;
    /* console.log("conneted:" + socket.id)*/
    console.log(user)
    socket.on('joined-room', name => {
        console.log("new user", name)
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        socket.emit('user-joined', name,socket.client.conn.server.clientsCount);
        socket.broadcast.emit("update-count",socket.client.conn.server.clientsCount)
    });

    socket.on('send', messege => {
        socket.broadcast.emit('receive', { messege: messege, name: user[socket.id] })
    })
    socket.on('disconnect', messege => {
        socket.broadcast.emit('left', user[socket.id]);
        delete user[socket.id];
        socket.broadcast.emit("update-count",socket.client.conn.server.clientsCount)
    });

});



server.listen(PORT, () => {
    console.log("Server listen on port", PORT)
})