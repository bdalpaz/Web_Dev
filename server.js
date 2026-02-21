const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});