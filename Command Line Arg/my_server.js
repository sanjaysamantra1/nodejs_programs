const http = require("http");
const PORT = process.argv[2] || 5000;
//create a server
const myServer = http.createServer((req, res) => {
  res.end(`<h1>This is The Response From Server</h1>`);
});
myServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
