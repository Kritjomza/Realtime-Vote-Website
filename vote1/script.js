var voteCount = [0, 0, 0];
var voteArea = document.getElementById("vote-area");
var voteResult = document.getElementById("vote-result");

function updateVoteResult() {
    voteResult.innerHTML = "";
    for (var i = 0; i < voteCount.length; i++) {
        voteResult.innerHTML += "<p>Vote " + (i + 1) + " : " + voteCount[i] + "</p>";
    }
}

for (var i = 0; i < voteCount.length; i++) {
    document.getElementById("vote-" + (i + 1)).addEventListener("click", function(event) {
        voteCount[event.target.id.split("-")[1] - 1]++;
        updateVoteResult();
    });
}

updateVoteResult();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle events (e.g., vote event)
    socket.on('vote', (voteIndex) => {
        // Update vote count on the server
        // Broadcast updated counts to all connected clients
        io.emit('updateVotes', voteCount);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
