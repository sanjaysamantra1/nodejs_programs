const http = require("http");
const users = require("./users.json");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const userId = req.url.split("users/").pop();

  console.log(url, method, userId);

  if (url === "/") {
    res.write(`<h1>This is the home page</h1>`);
  }
  if (url === "/users") {
    res.write(JSON.stringify(users));
  }
  if (url.includes("/users/") && userId) {
    const user = users.find((user) => user.id == userId);
    res.write(JSON.stringify(user));
  }
  if (url === "/users" && method === "POST") {
    res.write(`<h1>User Created Successfully!!!</h1>`);
  }
  if (url === "/users/" && method === "PUT") {
    res.write(`<h1>User Updated Successfully!!!</h1>`);
  }
  if (url === "/users/" && method === "PATCH") {
    res.write(`<h1>User Updated Successfully!!!</h1>`);
  }
  if (url === "/users/" && method === "DELETE") {
    res.write(`<h1>User ${userId} Deleted Successfully!!!</h1>`);
  }
  res.end();
});
server.listen(5000, () => {
  console.log("server running on port 5000");
});
