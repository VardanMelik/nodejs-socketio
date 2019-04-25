// Make connection

const socket = io.connect('http://localhost:4000');

// Query DOM
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    button = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat', function(data) {
    // For div
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';

    //Textarea
    // output.innerHTML += data.handle + ': ' + data.message;
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
});