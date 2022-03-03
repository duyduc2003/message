const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const userConnect = [];

io.on('connection', (socket) => {
  console.log('connected');
  let user = {};


  socket.on('user-name', (name) => {
    user.userName = name;
    userConnect.push(name);
    io.emit('user-connect', { name, userConnect })
  })

  socket.on('chat-message', (dataUser) => {
    io.emit('chat-message', dataUser);
  });

  socket.on('disconnect', () => {
    console.log(user.userName + ' disconnected');
    removeChildInArray(userConnect, user.userName);
    const name = user.userName;
    io.emit('user-disconnect', { name, userConnect })
  });

});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Listening server on port: ' + PORT);
});

function removeChildInArray(array, element) {
  const position = positionElement(array, element);
  array.splice(position, 1);
}

function positionElement(array, element) {
  for (let index in array) {
    if (array[index] === element) {
      return index;
    }
  }
}