const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
let app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('A New Client Joined');// when a client opens http://localhost:5000
  socket.on('setName', (name) => {
    socket.userName = name;
  })
  socket.on('chat', (data) => {
    let userName = socket.userName;
    let currentTime = new Date().toLocaleTimeString();
    let msgData = { message: data.message, userName: userName, time: currentTime };
    io.emit('chat', msgData);
  })
});
server.listen(5000, () => { console.log('server running') });