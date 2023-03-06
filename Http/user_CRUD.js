const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const userId = req.url.split("/").pop();

  if (url === "/") {
    res.write(`<h1>This is the home page</h1>`);
  }
  if (url === "/users") {
    res.write(`<h1>get All Users</h1>`);
  }
  if (url.includes("/users") && userId) {
    res.write(`<h1>get data for  User ${userId}</h1>`);
  }
  if (url === "/users" && method === "POST") {
    res.write(`<h1>User Created Successfully!!!</h1>`);
  }
  if (url === "/users" && method === "PUT") {
    res.write(`<h1>User Updated Successfully!!!</h1>`);
  }
  if (url === "/users" && method === "PATCH") {
    res.write(`<h1>User Updated Successfully!!!</h1>`);
  }
  if (url === "/users" && method === "DELETE") {
    res.write(`<h1>User Deleted Successfully!!!</h1>`);
  }
});
server.listen(5000, () => {
  console.log("server running on port 5000");
});
