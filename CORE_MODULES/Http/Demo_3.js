//Sendresponse
const http = require("http");

function reqListener(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write(`<h1>Response from Server....</h1>
          <p>This is a paragraph From Server.</p>`);
  res.end();
}
server = http.createServer(reqListener);
server.listen(5000, () => {
  console.log("server running on port 5000");
});
