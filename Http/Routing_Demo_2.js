//Send HTML file content as response
const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync("./home.html");
const aboutPage = readFileSync("./about.html");

server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url)
  if (url == "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } else if (url == "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(aboutPage);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1>OOPS</h1>
              <p>Sorry, Not able to find the page you are looking for</p>
              <a href='/'>Go To Home</a>`);
    res.end();
  }
});
server.listen(5000, () => {
  console.log("server running on port 5000");
});
