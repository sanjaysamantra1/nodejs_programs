//Sendresponse
const http = require("http");

function reqListener(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from node.js server</h1></body>");
  res.write("</html>");
  res.end();
}
server = http.createServer(reqListener);
server.listen(5000, () => {
  console.log("server running on port 5000");
});
