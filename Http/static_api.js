const fs = require("fs");
const http = require("http");

const server = http.createServer(function (req, res) {
  // read file with fs
  fs.readFile("users.json", "utf-8", function (err, data) {
    if (err) throw err;
    // return the data of file
    res.write(data);
    res.end();
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
