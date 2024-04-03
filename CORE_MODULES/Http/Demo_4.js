const http = require("http");

let Server = http.createServer((req, res) => {
  console.log("request received...");
  res.writeHead(200, { "content-type": "text/html" });
  res.write(`<div>
    <h1>This is Reponse Line-1</h1>
    <h2>This is Reponse Line-2</h2>
    <h3>This is Reponse Line-3</h3>
  </div>`);
  res.write(`
    <h4>This is Reponse Line-4</h4>
    <h5>This is Reponse Line-5</h5>
  `);
  res.end();
});

Server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
