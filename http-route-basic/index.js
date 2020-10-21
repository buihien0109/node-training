// import module http
const http = require('http');
// import module url
const url = require('url');

// Tao server và trả về 1 res
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader('Content-Type', 'text/html');
    if(req.url == "/" || req.url == "/overview") {
        res.end("<h1>Page Overview</h1>");
    } else if(req.url == "/product") {
        res.end("<h1>Page Product</h1>");
    } else {
        res.writeHead(404)
        res.end("<h1>Page not found</h1>");
    }
    
})

// Lắng nghe server ở cổng 8000
// host 127.0.0.1
server.listen('8000', '127.0.0.1', () => {
    console.log('Server ready');
})