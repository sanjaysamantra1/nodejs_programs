const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url == "/") {
    res.end("You are in Home Route");
  } else if (url == "/about") {
    res.end("You are in AboutUs Route");
  } else if (url == "/contactus") {
    res.end("You are in Contact Us Route");
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(`<h1>OOPS</h1>
              <p>Sorry, Not able to find the page you are looking for</p>
              <a href='/'>Go To Home</a>`);
  }
});
server.listen(5000);
