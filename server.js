const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const room = require('./room')

const port = normalizePort(process.env.PORT || 3000);
server.listen(port, () => {
  console.log('Project running on port', server.address().port);
})

app.use(express.static('client'));
//set socketio on express to use globally
app.set('socketio', io);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});
app.get('/single', (req, res) => {
  res.sendFile(__dirname + '/client/game.html');
});
app.get('/room', (req, res) => {
  room(req.app.get('socketio'))
  res.sendFile(__dirname + '/client/game.html');
});

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}