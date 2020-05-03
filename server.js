const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () => {
    console.log('Project running on port', server.address().port);
})

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/game', (req, res) => {
  res.sendFile(__dirname + '/client/game.html');
});