const http = require('http');
const routes = require('./routes');

console.log(routes.someText);
console.log("hiiii");
const server = http.createServer(routes.handler);
server.listen(5000);