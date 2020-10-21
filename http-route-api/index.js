// import module http
const http = require("http");
// import module url
const url = require("url");
// import module fs
const fs = require("fs");

/////////////////////////////////////////////////**
// Server
// Read file đúng 1 lần
// Sử dụng method readFileSync
// __dirname : Đường dẫn tuyệt đối đến thư mục làm việc
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Tao server và trả về 1 res
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/" || req.url === "/overview") {
    res.end("<h1>Page Overview</h1>");
  } else if (req.url === "/product") {
    res.end("<h1>Page Product</h1>");
  } else if (req.url === "/api") {
    // Bảo với browser là hiển thị ra json
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    // Gửi Json ra ngoài browser
    res.end(data);
  } else {
    res.writeHead(404);
    res.end("<h1>Page not found</h1>");
  }
});

// Lắng nghe server ở cổng 8000
// host 127.0.0.1
server.listen("8000", "127.0.0.1", () => {
  console.log("Server ready");
});
