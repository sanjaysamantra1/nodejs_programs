const http = require("http");

function reqListener(req, res) {
  console.log("Request Received");
  console.log(req.url, req.method, req.headers);
  res.write("Response From Server....");
}
server = http.createServer(reqListener);

server.listen(5000, () => {
  console.log(`Server is listening on 5000`);
});
// localhost:5000
