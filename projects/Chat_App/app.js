let express = require("express");
let http = require("http");
let path = require("path");
let io = require("socket.io");

let app = express();

app.set("port", process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, "public")));

let server = http.createServer(app).listen(app.get("port"), function () {
  console.log(`Server running on port 5000`);
});

io = require("socket.io").listen(server);

// handle socket traffic
io.sockets.on("connection", function (socket) {
  socket.on("nick", function (nick) {
    socket.nickname = nick;
  });

  // reply chat data to client
  socket.on("chat", function (data) {
    let nickname = socket.nickname;
    let currentTime = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
    let payload = {
      message: data.message,
      nick: nickname,
      time:currentTime
    };

    socket.emit("chat", payload);
    socket.broadcast.emit("chat", payload);
  });
});
