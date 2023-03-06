const http = require("http");
const users = require("./users.json");

const server = http.createServer((req, res) => {
  console.log(req.url);
  const userId = req.url.split("/").pop();
  console.log(`this is the details of user: ${userId}`);
  const user = users.find((user) => user.id == userId);
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.write("No user found");
  }
  res.end();
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
