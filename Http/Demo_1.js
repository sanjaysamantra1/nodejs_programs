const http = require("http");

function reqListener(req, res) {
  console.log("Hiiiiiii");
  console.log(req.url, req.method, req.headers);
}
server = http.createServer(reqListener);
server.listen(5000);

// localhost:5000
