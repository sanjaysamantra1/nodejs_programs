let express = require("express");
let app = express();

let path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const server = require('http').createServer(app);
server.listen(5000, () => console.log('Server Running on port 5000'));

const io = require('socket.io')(server);

// handle socket traffic
io.on("connection", function (socket) {
  socket.on("nick", function (name) {
    socket.nickname = name;
  });
  // reply chat data to client
  socket.on("chat", function (data) {
    let nickname = socket.nickname;
    let currentTime = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    let payload = {
      message: data.message,
      nick: nickname,
      time: currentTime,
    };
    io.emit("chat", payload);
  });
});
