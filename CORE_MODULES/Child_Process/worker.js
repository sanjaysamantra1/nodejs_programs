const http = require("http");

process.on("message", (msg) => {
  if (msg === "Start Server") {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Handled by worker ${process.pid}\n`);
    });

    server.listen(3000, () => {
      console.log(`Worker ${process.pid} started on port 3000`);
    });
  }
});
