const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write("<h1>You are on Home Page</h1>");
  } else if (url === "/login") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<center>
    <h2>Login Form</h2>
    <form action='login-success' method='POST'>
      <p>User name: <input type="text" name="uname" /></p>
      <p>Password: <input type="password" name="upwd" /></p>
      <button type="submit">Login</button>
    </form>
    
    </center>`);
  }else if (url === "/login-success" && method === "POST") {
    res.write('<h1>Login Success</h1')
  }
  res.end();
});

server.listen(5000, () => {
  console.log("server is listening on port 5000");
});
