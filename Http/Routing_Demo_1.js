const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url == "/") {
    res.write("You are in Home Route");
  } else if (url == "/about") {
    res.write("You are in AboutUs Route");
  } else if (url == "/contactus") {
    res.write("You are in Contact Us Route");
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1>OOPS</h1>
              <p>Sorry, Not able to find the page you are looking for</p>
              <a href='/'>Go To Home</a>`);
  }
  res.end();
});
server.listen(5000,()=>{console.log("Server is running on port 5000")});

