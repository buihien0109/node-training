// import module http
const http = require('http');


// Tao server và trả về 1 res
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>Server listenning in port 8000</h1>");
})

// Lắng nghe server ở cổng 8000
// host 127.0.0.1
server.listen('8000', '127.0.0.1', () => {
    console.log('Server ready');
})