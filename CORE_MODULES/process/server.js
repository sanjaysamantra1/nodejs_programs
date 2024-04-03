const http = require("http");
require("dotenv").config();

const server = http.createServer((req, res) => {
  res.end("Hello From Server!!!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
