var http = require("http");
var url = require("url");

const server = http.createServer(function (req, res) {
  let params = url.parse(req.url, true).query;
  let { name, age } = params;
  let msg = "";
  if (name && age) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    msg = `${name} is ${age} years old`;
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    msg = `Bad Request`;
  }
  res.write(msg);
  res.end();
});

server.listen(8080, () => console.log("Server running on port 8080"));

//http://localhost:8080/?name=Peter&age=34
