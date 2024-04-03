const http = require("http");
const port = 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write(`<h1>You Are in Home Route</h1>
        <a href="http://localhost:5000/users">users</a> get users <br><br>
        <a href="http://localhost:5000/comments">comments</a> get comments<br><br>
        <a href="http://localhost:5000/products">products</a> get products<br><br>
    `);
  }
  else if (url === "/users") {
    // write logic to fetch the users from Database and return to the client
    res.write("<h1>All Users</h1>");
  } else if (url === "/comments") {
    // write logic to fetch the users from Database and return to the client
    res.write("<h1>All Comments</h1>");
  } else if (url === "/products") {
    // write logic to fetch the users from Database and return to the client
    res.write("<h1>All products</h1>");
  } else {
    res.write(`<h1>OOPS</h1>
              <p>Sorry, Not able to find the page you are looking for</p>
              <a href='/'>Go To Home</a>`);
  }
  res.end();
});

server.listen(port, () => {
  console.log("listening on port", port);
});
