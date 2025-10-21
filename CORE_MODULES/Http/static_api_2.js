const http = require("http");
const users = require("./users.json"); // Static config, constants, mock data

const server = http.createServer((req, res) => {
  res.write(JSON.stringify(users));
  res.end();
});

server.listen(5000, () => {
  console.log("listening at http://localhost:5000");
});
