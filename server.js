const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, '/')));

let totalVotes = 0;

io.on('connection', (socket) => {
  socket.emit('votes', totalVotes);

  socket.on('votes', (votes) => {
    votes = parseInt(votes);
    if (!isNaN(votes) && votes >= 0 && votes <= 10) {
      totalVotes += votes;
      io.emit('votes', totalVotes);
    }
  });

  socket.on('newVote', (name) => {
    totalVotes = 0;
    io.emit('votes', totalVotes);
    io.emit('newVote', name);
  });
});

server.listen(3000, '192.168.7.184', () => {
  console.log('listening on 192.168.7.184:3000');
});