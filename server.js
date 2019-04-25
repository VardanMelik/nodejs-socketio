const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();

const server = app.listen(4000, () => {
    console.log("Listening requests on port 4000");
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Made socket connection, id: ', socket.id);
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});