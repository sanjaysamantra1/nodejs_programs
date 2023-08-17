const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url)
  const id = req.url.split("/").pop();
  res.write(`<h1><center>This is the details of user- ${id}</center></h1>`);
  res.end();
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
