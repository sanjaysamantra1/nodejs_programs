var http = require("http");
var url = require("url");

const server = http.createServer(function (req, res) {
    let q = url.parse(req.url, true).query;
    let msg = `${q.name} is ${q.age} years old`;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(msg);
    res.end();
});

server.listen(8080, () => console.log("Server running on port 8080"));

//http://localhost:8080/?name=Peter&age=34
