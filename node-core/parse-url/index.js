// import module http
const http = require("http");
// import module url
const url = require("url");
// import module fs
const fs = require("fs");
// import module custom
const replaceTemplate = require('./modules/replaceTemplate');

/////////////////////////////////////////////////**
// Server

// Khai báo các template sử dụng trong trang
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

// Read file đúng 1 lần
// Sử dụng method readFileSync
// __dirname : Đường dẫn tuyệt đối đến thư mục làm việc
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Tao server và trả về 1 res
const server = http.createServer((req, res) => {

	// Lấy ra query string và pathname từ url
	const { query, pathname} = url.parse(req.url, true);

	// Overview
	if (pathname === "/" || pathname === "/overview") {
		res.writeHead(200, {"Content-type": "text/html"});

		// Gọi hàm thay thế
		// Cuối cùng join mảng thành chuỗi và trả về cho front end đê hiển thị
		const cardsHtml = dataObj.map(ele => replaceTemplate(tempCard, ele)).join('');
		const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

		res.end(output);

	// product
	} else if (pathname === "/product") {
		res.writeHead(200, {"Content-type": "text/html"});

		// Lấy ra product trong mảng dataObj có id = query.id
		const product = dataObj[query.id];

		const output = replaceTemplate(tempProduct, product);

		res.end(output);

	// API
	} else if (pathname === "/api") {
		// Bảo với browser là hiển thị ra json
		res.writeHead(200, {"Content-type": "application/json"});
		// Gửi Json ra ngoài browser
		res.end(data);

	// 404
	} else {
		res.writeHead(404);
		res.end("Page not found");
	}
});

// Lắng nghe server ở cổng 8000
// host 127.0.0.1
server.listen("8000", "127.0.0.1", () => {
	console.log("Server ready");
});