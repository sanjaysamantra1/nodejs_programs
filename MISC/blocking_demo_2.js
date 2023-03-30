const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url == "/") {
    res.end("You are in Home Route");
  } else if (url == "/about") {
    // Blocking code...
    for (i = 1; i <= 200; i++) {
      for (j = 1; j <= 200; j++) {
        console.log(`${i} ${j}`);
      }
    }
    
    res.end("You are in AboutUs Route");
  } else if (url == "/contactus") {
    res.end("You are in Contact Us Route");
  } else {
    res.end("<h1>Route Doesn't Exist</h1>");
    res.writeHead(404, { "content-type": "text/html" });
  }
});
server.listen(5000, () => {
  console.log("server listening on port 5000");
});

// event loop is blocked, when user-1 hits http://localhost:5000/about , other routes are also blocked
// open diff routes in diff tab and test
