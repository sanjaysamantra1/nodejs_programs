const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><form action="/message"method="POST" ><input name="message"><button>Send</form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'dummyyyyyyyyy');
        res.statusCode = 302;
        res.setHeader('location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h2>Helloooooooo</h2></body>');
    res.write('</html>');
    res.end();
}
//module.exports = requestHandler;
//OR
//module.exports.handler = requestHandler
//OR
exports.handler = requestHandler;
exports.someText = 'Some hardcoded text';




