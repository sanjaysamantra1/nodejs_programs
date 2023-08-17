const http = require("http");
const url = require("url");

const server = http.createServer(function (req, res) {
  let params = url.parse(req.url, true).query;
  let { name, age } = params;
  let msg = "";
  if (name && age) {
    res.writeHead(200, { "Content-Type": "text/html" });
    msg = `<p><center><b>${name}</b> is <b>${age}</b> years old<center></p>`;
  } else {
    res.writeHead(400, { "Content-Type": "text/html" });
    msg = `<p><center><b>Bad request</b><center></p>`;
  }
  res.write(msg);
  res.end();
});

server.listen(8080, () => console.log("Server running on port 8080"));

//http://localhost:8080/?name=Peter&age=34
