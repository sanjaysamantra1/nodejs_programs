const http = require("http");

//create a server
const myServer = http.createServer((req, res) => {
  console.log(req);
  res.end("Response From Node Server...");
});

myServer.listen(5000, () => {
  console.log("listening on port 5000");
});
