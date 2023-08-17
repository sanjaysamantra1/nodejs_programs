const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request received...");
  res.write("<h1>This is response From server...</h1>");
});

server.listen(5000, () => {
  console.log("Server Listening on port 5000");
});

setTimeout(server.close, 20000); // No request will be accepted after 20sec
